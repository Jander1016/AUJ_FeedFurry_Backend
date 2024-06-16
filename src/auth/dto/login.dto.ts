import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty, IsStrongPassword, MaxLength, MinLength } from "class-validator";

export class LoginDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @Transform(({value})=> value.trim())
  @IsNotEmpty()
  @MinLength(8) 
  @MaxLength(150)
  // @IsStrongPassword()
  password: string;
}