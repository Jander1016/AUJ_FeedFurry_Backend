import { Module } from '@nestjs/common';
import { DetailDietService } from './detail-diet.service';
import { DetailDietController } from './detail-diet.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetailDiet } from './entities/detail-diet.entity';
// import { FoodModule } from 'src/food/food.module';
// import { DietModule } from 'src/diet/diet.module';

@Module({
  imports: [TypeOrmModule.forFeature([DetailDiet])],
  exports: [DetailDietService],
  controllers: [DetailDietController],
  providers: [DetailDietService],
})
export class DetailDietModule {}
