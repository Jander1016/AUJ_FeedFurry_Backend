import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDietDto } from './dto/create-diet.dto';
import { UpdateDietDto } from './dto/update-diet.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Diet } from './entities/diet.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DietService {
  constructor(
    @InjectRepository(Diet)
    private readonly dietRepository: Repository<Diet>
  ) { }
  async create(createDietDto: CreateDietDto) {
    const newDiet = await this.dietRepository.save(createDietDto)
    return newDiet
  }

  async findAll() {
    const listDiets = await this.dietRepository.find(
      {
        relations: {
          pet: true,
          food: true
        },
      }
    )
    if (!listDiets || listDiets.length === 0) throw new NotFoundException("Diets Not Found");
    return listDiets;
  }

  async findOne(id: string) {
    const findDiet = await this.dietRepository.findOne(
      {
        where: { diet_id: id },
        relations: {
          pet: true,
          food: true
        },
      }
    )
    if (!findDiet) throw new NotFoundException(`Diet with id ${id} Not Found`);
    return findDiet;
  }

  async update(id: string, updateDietDto: UpdateDietDto) {
    const existingFood = await this.findOne(id)
    if (!existingFood) throw new NotFoundException(`Food with id ${id} Not Found`);
    const updatedDiet = this.dietRepository.save({...existingFood,...updateDietDto });
    return updatedDiet;
  }

  remove(id: string) {
    return `This action removes a #${id} diet`;
  }
}
