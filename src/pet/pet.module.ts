import { Module } from '@nestjs/common';
import { PetService } from './pet.service';
import { PetController } from './pet.controller';
import { PetTypeModule } from 'src/pet-type/pet-type.module';
import { ActivitiesModule } from 'src/activities/activities.module';
import { PetConditionModule } from 'src/pet-condition/pet-condition.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pet } from './entities/pet.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Pet]), PetTypeModule, PetConditionModule, ActivitiesModule, UsersModule],
  controllers: [PetController],
  providers: [PetService],
  exports: [PetService],
})
export class PetModule {}
