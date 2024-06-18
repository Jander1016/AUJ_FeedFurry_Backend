import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, MaxLength, MinLength } from "class-validator";

export class CreateBreedDto {
   @ApiProperty()
   @IsNotEmpty() @MinLength(3) @MaxLength(50)
  description: string;

  @ApiProperty()
  pet_type_id: string;

  is_active: number;
}
