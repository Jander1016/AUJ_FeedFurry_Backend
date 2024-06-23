import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNotEmpty, IsNumber, MaxLength, MinLength } from "class-validator";

export class CreateFoodDto {
  @ApiProperty()
   @IsNotEmpty()
   @Transform(({value})=> value.trim())
   @MinLength(3)
   @MaxLength(50)
   name: string;

   @ApiProperty()
   @IsNotEmpty() @IsNumber()
   calories: number;

   @ApiProperty()
   @IsNotEmpty() @IsNumber()
   protein: number;
 
    @ApiProperty()
   @IsNotEmpty() @IsNumber()
   fat: number;
 
    @ApiProperty()
   @IsNotEmpty() @IsNumber()
   carbohydrates: number;
 
    @ApiProperty()
   @IsNotEmpty() @IsNumber()
   fiber: number;
 
    @ApiProperty()
   @IsNotEmpty() @IsNumber()
   sodium: number;
 
   @IsNotEmpty() @IsNumber()
   is_active: number;

}
