import { Module } from '@nestjs/common';
import { PetService } from './pet.service';
import { PetController } from './pet.controller';
import { PetTypeModule } from 'src/pet-type/pet-type.module';
import { ActivitiesModule } from 'src/activities/activities.module';
import { PetConditionModule } from 'src/pet-condition/pet-condition.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pet } from './entities/pet.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pet]), PetTypeModule,PetConditionModule, ActivitiesModule],
  controllers: [PetController],
  providers: [PetService],
})
export class PetModule {}
