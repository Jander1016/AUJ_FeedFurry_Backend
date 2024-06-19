import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreatePetConditionDto {
  @ApiProperty()
  description: string;
  
  @ApiProperty()
  @IsNotEmpty() @IsNumber()
  factor_value: number;

}
