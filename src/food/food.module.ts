import { Module } from '@nestjs/common';
import { FoodService } from './food.service';
import { FoodController } from './food.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Food } from './entities/food.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Food])],
  exports: [FoodService],
  controllers: [FoodController],
  providers: [FoodService],
})
export class FoodModule {}
