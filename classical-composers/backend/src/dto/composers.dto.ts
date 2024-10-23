import { IsArray } from "class-validator"
import { PageMetaDto } from "./pageMeta.dto"
import { Composer } from "src/entities/composer"

export class ComposerDto {
  @IsArray()
  readonly data: Composer[]

  readonly meta: PageMetaDto

  constructor(data: Composer[], meta: PageMetaDto) {
    this.data = data
    this.meta = meta
  }
}
