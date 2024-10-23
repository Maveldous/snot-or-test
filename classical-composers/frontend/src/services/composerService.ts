interface RequestParams {
  order?: "ASC" | "DESC"
  filter?: string
  page?: number
  take?: number
}

export class ComposerService {
  private static readonly COMPOSER_SERVICE_URL =
    "http://localhost:8080/composers"

  static async getComposers(body: RequestParams) {
    try {
      const composers = await fetch(this.COMPOSER_SERVICE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })
      return await composers.json()
    } catch (e) {
      console.error(e)
    }
  }
}
