import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateActivityDto {
  @ApiProperty()
  @IsNotEmpty() 
  description: string;

  @ApiProperty()
  @IsNotEmpty() @IsNumber()
  factor_value: number;
}
