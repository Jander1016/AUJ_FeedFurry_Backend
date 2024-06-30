import { Module } from '@nestjs/common';
import { DietService } from './diet.service';
import { DietController } from './diet.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Diet } from './entities/diet.entity';
import { PetModule } from 'src/pet/pet.module';
import { DetailDietModule } from 'src/detail-diet/detail-diet.module';
import { FoodModule } from 'src/food/food.module';
import { DetailDiet } from 'src/detail-diet/entities/detail-diet.entity';
import { Food } from 'src/food/entities/food.entity';
import { Pet } from 'src/pet/entities/pet.entity';
@Module({
  imports:[TypeOrmModule.forFeature([Diet, Pet, Food, DetailDiet]), PetModule, FoodModule, DetailDietModule],
  controllers: [DietController],
  providers: [DietService],
  exports: [DietService],
})
export class DietModule {}
