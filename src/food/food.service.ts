import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Food } from './entities/food.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FoodService {
  constructor(
    @InjectRepository(Food)
    private readonly foodRepository: Repository<Food>    
  ){}
  async create(createFoodDto: CreateFoodDto) {
    const newFood = await this.foodRepository.save(createFoodDto)
    return newFood;
    }

  async findAll() {
    const listFoods = await this.foodRepository.find({ where: { is_active: 1 }})
    if(!listFoods || listFoods.length === 0) throw new NotFoundException("Foods Not Found");
    return listFoods;
  }

  async findOne(id: string) {
    const existingFood = await this.foodRepository.findOne(
      {
        where: { 
          food_id: id,
          is_active: 1
         }
      }
    )
    if(!existingFood) throw new NotFoundException(`Food with id ${id} Not Found`);
    return existingFood;
  }

  async update(id: string, updateFoodDto: UpdateFoodDto) {
    const existingFood = await this.findOne(id);
    if(!existingFood) throw new NotFoundException(`Food with id ${id} Not Found`);
    const updatedFood = await this.foodRepository.save({...existingFood,...updateFoodDto });
    return updatedFood
  }

  remove(id: string) {
    return `This action removes a #${id} food`;
  }
}
