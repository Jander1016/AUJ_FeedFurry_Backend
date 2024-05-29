import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PetConditionService } from './pet_condition.service';
import { CreatePetConditionDto } from './dto/create-pet_condition.dto';
import { UpdatePetConditionDto } from './dto/update-pet_condition.dto';

@Controller('pet-condition')
export class PetConditionController {
  constructor(private readonly petConditionService: PetConditionService) {}

  @Post()
  create(@Body() createPetConditionDto: CreatePetConditionDto) {
    return this.petConditionService.create(createPetConditionDto);
  }

  @Get()
  findAll() {
    return this.petConditionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.petConditionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePetConditionDto: UpdatePetConditionDto) {
    return this.petConditionService.update(+id, updatePetConditionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.petConditionService.remove(+id);
  }
}
