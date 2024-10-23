import { Injectable } from "@nestjs/common"
import * as composersData from "./db/composers.json"
import { Order } from "./constants"
import { ComposerDto, ComposersOptionsDto, PageMetaDto } from "./dto"

@Injectable()
export class ComposerService {
  getComposers(composerOptions: ComposersOptionsDto): ComposerDto {
    const { filter, order, page, take } = composerOptions
    const skip = page * take
    let composers = composersData

    if (filter) composers = composers.filter((c) => c.name.includes(filter))

    if (order)
      composers.sort((a, b) =>
        order === Order.ASC
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name)
      )

    if (typeof skip === "number" && take)
      composers = composers.slice(skip, skip + take)

    const pageMetaDto = new PageMetaDto({
      itemCount: composersData.length,
      pageOptionsDto: composerOptions,
    })

    return new ComposerDto(composers, pageMetaDto)
  }
}
