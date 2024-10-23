import { AccountPaymentMethods, Customer } from "../entities/customer"
import { TransportService } from "./transport-service"
import { makeTraceparent } from "../helpers"

type Email = {
  from: string
  to: string[]
  messageBody: string
}

export class MessageService {
  private readonly MESSAGE_SERVICE_URL: "https://some-email-api"

  async sendMessage(contact: Customer) {
    const emailPayload = this.makeEmailPayload(contact)

    try {
      const response = await fetch(this.MESSAGE_SERVICE_URL, {
        method: "POST",
        headers: {
          Accept: "application/json, */*",
          "Content-Type": "application/json",
          Traceparent: makeTraceparent(),
          Authorization: "Bearer " + process.env.API_KEY,
        },
        body: JSON.stringify(emailPayload),
      })
      return TransportService.processRequest(response)
    } catch (e) {
      console.warn("Error sending message to user")
      return Promise.reject(e.message)
    }
  }

  private makeEmailPayload(contact: Customer) {
    const message = this.getMessageText(contact)

    const emailPayload: Email = {
      from: "paymentprocessing@aep.com",
      to: [],
      messageBody: message,
    }

    const getCarrierEmail = (mobile: string, carrier: string) => {
      switch (carrier) {
        case "at&t":
          return `${mobile}@text.att.net`
        case "tmobile":
          return `${mobile}@tmomail.net`
        default:
          return [
            `${mobile}@text.att.net`,
            `${mobile}@tmomail.net`,
            `${mobile}@vtext.com`,
          ]
      }
    }

    if (contact.email) {
      emailPayload.to = [contact.email]
    } else if (contact.mobile) {
      const carrierEmails = getCarrierEmail(
        contact.mobile,
        contact.mobileCarrier
      )
      if (Array.isArray(carrierEmails)) {
        emailPayload.to = carrierEmails
      } else {
        emailPayload.to = [carrierEmails]
      }
    }

    return emailPayload
  }

  private getMessageText(contact: Customer): string {
    const { eu_pay_by_bank, usBankAccount, defaultPaymentLastFourDigits } =
      contact.paymentMethods

    switch (contact.paymentMethods.defaultPaymentMethod) {
      case AccountPaymentMethods.card:
        return `Hello, ${contact.name},
        The scheduled payment for your electrical bill ending from your ${contact.paymentMethods.card.brand} credit card ending in ${defaultPaymentLastFourDigits} failed.		
        Please verify your payment details and try again.`
      case AccountPaymentMethods.EUBank:
        return `Hello, ${contact.name},
        The scheduled payment for your electrical bill from your ${eu_pay_by_bank.organization_name} bank account ending in ${defaultPaymentLastFourDigits} failed.
        Please verify your payment details and try again.`
      case AccountPaymentMethods.usBankAccount:
        return `Hello, ${contact.name},
        The scheduled payment for your electrical bill from your ${usBankAccount.bankName} account ending in ${defaultPaymentLastFourDigits} failed.
        Please verify your payment details and try again.`
      default:
        return `Hello, ${contact.name},
      There was an issue processing your payment. Please verify your payment details and try again.`
    }
  }
}
