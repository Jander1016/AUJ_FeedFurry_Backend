import { PartialType } from '@nestjs/mapped-types';
import { CreatePetConditionDto } from './create-pet_condition.dto';

export class UpdatePetConditionDto extends PartialType(CreatePetConditionDto) {}
