import { Module } from '@nestjs/common';
import { DietService } from './diet.service';
import { DietController } from './diet.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Diet } from './entities/diet.entity';
import { PetModule } from 'src/pet/pet.module';
import { FoodModule } from 'src/food/food.module';

@Module({
  imports:[TypeOrmModule.forFeature([Diet]), PetModule, FoodModule],
  controllers: [DietController],
  providers: [DietService],
  exports: [DietService],
})
export class DietModule {}
