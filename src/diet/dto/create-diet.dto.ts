import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateDietDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  pet_id: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  food_id: string;
}
