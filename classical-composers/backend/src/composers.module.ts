import { Module } from "@nestjs/common";
import { ComposerController } from "./composers.controller";
import { ComposerService } from "./composers.service";

@Module({
	imports: [],
	controllers: [ ComposerController ],
	providers: [ ComposerService ]
})
export class ComposerModule {
}
