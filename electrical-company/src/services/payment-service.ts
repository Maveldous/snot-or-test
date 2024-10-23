import customers from "../customer-list.json"
import { getCustomerPaymentAmount, makeTraceparent } from "../helpers"
import { HttpMethod } from "../static"
import { TransportService } from "./transport-service"
import { Customer } from "../entities/customer"
import { MessageService } from "./message-service"

export class PaymentService {
  constructor(private MessageService: MessageService) {}
  private readonly PAYMENT_SERVICE_URL: "https://api.stripe.com/some-payment-endpoint"

  public async paymentsProcess() {
    return Promise.all(
      customers.map((c) => {
        if (c.paymentMethods[c.paymentMethods.defaultPaymentMethod]) {
          console.error(
            `Validation error: customer ${c.email} don't have payment info on ${c.paymentMethods.defaultPaymentMethod}`
          )
          return null
        } else return this.paymentProcess(c)
      })
    )
  }

  public async paymentProcess(customer: Customer) {
    try {
      await this.fetchPayment(customer)
      console.log("Successfully processed payment for customer", customer.id)
    } catch (e) {
      console.error("The payment failed to process:", e)

      // WE SHOULD NOT USE MESSAGE TEXT HERE AS A CONDITION. BY QUCK SEARCH I DO NOT FIND SPECIAL TYPE OR CODE THAT RETURN STRIPE IN SUCH CASES, SO JUST PUT A COMMENT HERE
      if (e.message === "Payment Failed") {
        console.error("The payment failed to process:", e)

        this.sendMessage(customer)
      }
    }
  }

  private sendMessage(customer: Customer) {
    this.MessageService.sendMessage(customer)
  }

  private async fetchPayment(customer: Customer) {
    try {
      const response = await fetch(this.PAYMENT_SERVICE_URL, {
        method: HttpMethod.POST,
        headers: {
          "Content-Type": "application/json",
          Traceparent: makeTraceparent(),
          Authorization: `Bearer ${process.env.STRIPE_API_KEY}`,
        },
        body: JSON.stringify({
          customerId: customer.id,
          paymentMethod:
            customer.paymentMethods[
              customer.paymentMethods.defaultPaymentMethod
            ],
          amount: getCustomerPaymentAmount(customer.id),
        }),
      })

      return TransportService.processRequest(response)
    } catch (e) {
      console.error(`Error calling Stripe payment API: ${e.message}`)
      return Promise.reject(e.message)
    }
  }
}
