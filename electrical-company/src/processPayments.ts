import { PaymentService } from "./services/payment-service"
import { MessageService } from "./services/message-service"

new PaymentService(new MessageService()).paymentsProcess()
