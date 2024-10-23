import { traceparent } from "tctx"

export function getCustomerPaymentAmount(customerId: number) {
  const amount = Math.floor(Math.random() * (100 - 50 + 1) + 50) + Math.random()
  return amount.toFixed(2)
}

export const makeTraceparent = () => traceparent.make().toString()
