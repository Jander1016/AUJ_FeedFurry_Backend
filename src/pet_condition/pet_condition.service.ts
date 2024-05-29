import { Injectable } from '@nestjs/common';
import { CreatePetConditionDto } from './dto/create-pet_condition.dto';
import { UpdatePetConditionDto } from './dto/update-pet_condition.dto';

@Injectable()
export class PetConditionService {
  create(createPetConditionDto: CreatePetConditionDto) {
    return 'This action adds a new petCondition';
  }

  findAll() {
    return `This action returns all petCondition`;
  }

  findOne(id: number) {
    return `This action returns a #${id} petCondition`;
  }

  update(id: number, updatePetConditionDto: UpdatePetConditionDto) {
    return `This action updates a #${id} petCondition`;
  }

  remove(id: number) {
    return `This action removes a #${id} petCondition`;
  }
}
