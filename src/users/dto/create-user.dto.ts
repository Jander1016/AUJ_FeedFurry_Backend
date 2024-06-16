import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  password?: string;

  @ApiProperty()
  @Transform(({value})=> value.trim())
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  name: string;

  @ApiProperty()  
  @Transform(({value})=> value.trim())
  @MinLength(3)
  @MaxLength(50)
  lastname: string;

  @ApiProperty()
  @Transform(({value})=> value.trim())
  @MinLength(9)
  @MaxLength(15)
  phone: string;

  @ApiProperty()
  role?: string;

  @ApiProperty()
  isActive: number;
}
