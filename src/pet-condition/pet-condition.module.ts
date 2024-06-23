import { Module } from '@nestjs/common';
import { PetConditionService } from './pet-condition.service';
import { PetConditionController } from './pet-condition.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PetCondition } from './entities/pet-condition.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PetCondition])],
  controllers: [PetConditionController],
  providers: [PetConditionService],
  exports: [PetConditionService],
})
export class PetConditionModule {}
