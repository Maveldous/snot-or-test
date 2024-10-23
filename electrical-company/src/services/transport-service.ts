import { HttpStatusCode } from "../static"

type ErrorResponse = {
  statusCode: number
  statusMessage: string
  unrecoverable: boolean
}

export class TransportService {
  private static statusReject(res: Response): ErrorResponse {
    var statusMessage = null

    switch (res.status) {
      case HttpStatusCode.BadRequest:
        statusMessage = res.statusText
      case HttpStatusCode.Unauthorized:
        statusMessage = "Authentication Error"
        break
      case HttpStatusCode.Forbidden:
        statusMessage = "Authorization Error"
        break
      case HttpStatusCode.NotFound:
        statusMessage = "Not Found"
        break
      case HttpStatusCode.Conflict:
        statusMessage = "Conflict"
        break
      default:
        statusMessage = "Request Error"
        break
    }

    return {
      statusCode: res.status,
      statusMessage,
      unrecoverable: res.status === HttpStatusCode.Unauthorized,
    }
  }

  static async processRequest(response: any) {
    if (response.ok) {
      return await response.json()
    } else if (response.status == HttpStatusCode.Forbidden) {
      return Promise.reject(this.statusReject(response))
    } else {
      return Promise.reject(await response.json())
    }
  }
}
