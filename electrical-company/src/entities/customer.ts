type Card = {
  brand: string
  last4: string
}

interface UsBankAccount {
  bankName: string
  accountType: string
  accountNumberLast4Digits: string
}

interface EuBank {
  organization_name: string
  country_code: string
  iban_last_4: string
}

type PaymentMethods = {
  card?: Card
  usBankAccount?: UsBankAccount
  eu_pay_by_bank?: EuBank
  defaultPaymentMethod: string
  defaultPaymentLastFourDigits: string
}

export enum AccountPaymentMethods {
  EUBank = "eu_pay_by_bank",
  usBankAccount = "usBankAccount",
  card = "card",
}

export type Customer = {
  id: number
  name: string
  email?: string
  mobile?: string
  mobileCarrier?: string
  paymentMethods: PaymentMethods
}
