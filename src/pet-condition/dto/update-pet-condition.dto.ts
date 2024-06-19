import { PartialType } from '@nestjs/swagger';
import { CreatePetConditionDto } from './create-pet-condition.dto';

export class UpdatePetConditionDto extends PartialType(CreatePetConditionDto) {
  CreatePetConditionDto?: CreatePetConditionDto
}
