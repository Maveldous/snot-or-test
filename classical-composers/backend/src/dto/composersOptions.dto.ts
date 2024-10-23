import { Type } from "class-transformer"
import { IsEnum, IsInt, IsOptional, Max, Min } from "class-validator"
import { Order } from "../constants"

export class ComposersOptionsDto {
  @IsEnum(Order)
  @IsOptional()
  readonly order?: Order = Order.ASC

  @Type(() => String)
  @IsOptional()
  readonly filter?: string

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  readonly page?: number = 1

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  @IsOptional()
  readonly take?: number = 10
}
