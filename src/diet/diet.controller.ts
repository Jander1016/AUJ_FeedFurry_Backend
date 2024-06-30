import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { DietService } from './diet.service';
import { CreateDietDto } from './dto/create-diet.dto';
import { UpdateDietDto } from './dto/update-diet.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('diets')
@ApiTags('Diet')
export class DietController {
  constructor(private readonly dietService: DietService) {}

  @Post()
  async generateDiets(@Body() createDietDto: CreateDietDto) {
    try {
      const newDiet = await this.dietService.generateAndSaveDiets(createDietDto);
      return { message: 'Diets generated and saved successfully.', data: newDiet };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new HttpException({
          status: HttpStatus.NOT_FOUND,
          error: error.message,
        }, HttpStatus.NOT_FOUND);
      } else {
        throw new HttpException({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'An unexpected error occurred while generating diets.',
        }, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  @Get()
  findAll() {
    return this.dietService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dietService.findOne(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateDietDto: UpdateDietDto) {
  //   return this.dietService.update(id, updateDietDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dietService.remove(id);
  }
}
