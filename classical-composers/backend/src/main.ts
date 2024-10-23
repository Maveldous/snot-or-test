import { NestFactory } from "@nestjs/core"
import { ComposerModule } from "./composers.module"

async function bootstrap() {
  const app = await NestFactory.create(ComposerModule)
  app.enableCors()
  await app.listen(8080)
}

bootstrap()
