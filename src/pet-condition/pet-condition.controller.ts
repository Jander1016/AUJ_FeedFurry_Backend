import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PetConditionService } from './pet-condition.service';
import { CreatePetConditionDto } from './dto/create-pet-condition.dto';
import { UpdatePetConditionDto } from './dto/update-pet-condition.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('pet-conditions')
@ApiTags('Pet Condition')
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
    return this.petConditionService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePetConditionDto: UpdatePetConditionDto) {
    return this.petConditionService.update(id, updatePetConditionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.petConditionService.remove(id);
  }
}
