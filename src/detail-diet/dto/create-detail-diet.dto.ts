import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsUUID } from "class-validator";

export class CreateDetailDietDto {
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  diet_id: string;

  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  food_id: string;
}
