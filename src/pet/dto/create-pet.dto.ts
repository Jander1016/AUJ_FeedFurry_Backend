import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString, MaxLength, MinLength } from "class-validator";

export class CreatePetDto {

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value.trim())
  @MinLength(3) @MaxLength(50)
  name: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  pet_type_id: string


  @ApiProperty()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  @IsString()
  genre: string

  @ApiProperty()
  @IsNotEmpty() @IsNumber()
  weight: number

  @ApiProperty()
  @IsNotEmpty() @IsNumber()
  age: number

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  condition_id: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  activity_id: string

  @ApiProperty()
  @IsNotEmpty() @IsNumber()
  ratio: number

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  user_id: string


  @IsNotEmpty() @IsNumber()
  is_active: number

}
