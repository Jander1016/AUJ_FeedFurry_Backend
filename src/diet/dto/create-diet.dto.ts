import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsUUID } from "class-validator";

export class CreateDietDto {
  
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  pet_id: string;
}

export class CreateDetailDietDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  foodId: string;
}