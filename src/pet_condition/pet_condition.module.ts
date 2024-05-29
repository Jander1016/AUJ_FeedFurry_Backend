import { Module } from '@nestjs/common';
import { PetConditionService } from './pet_condition.service';
import { PetConditionController } from './pet_condition.controller';

@Module({
  controllers: [PetConditionController],
  providers: [PetConditionService],
})
export class PetConditionModule {}
