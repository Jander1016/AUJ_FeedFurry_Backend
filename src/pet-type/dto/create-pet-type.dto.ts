import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, MaxLength, MinLength } from "class-validator";

export class CreatePetTypeDto {
  @ApiProperty()
  @IsNotEmpty() @MinLength(3) @MaxLength(50)
  description: string
}
