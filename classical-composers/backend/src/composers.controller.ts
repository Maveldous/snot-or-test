import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common"
import { ComposerService } from "./composers.service"
import { ComposerDto, ComposersOptionsDto } from "./dto"

@Controller("composers")
export class ComposerController {
  constructor(private readonly composerService: ComposerService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  getComposers(@Body() request: ComposersOptionsDto): ComposerDto {
    return this.composerService.getComposers(request)
  }
}
