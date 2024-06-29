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
          pet: true
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
          pet: true
        },
      }
    )
    if (!findDiet) throw new NotFoundException(`Diet with id ${id} Not Found`);
    return findDiet;
  }

  async update(id: string, updateDietDto: UpdateDietDto) {
    const existingDiet = await this.findOne(id)
    if (!existingDiet) throw new NotFoundException(`Food with id ${id} Not Found`);
    const updatedDiet = this.dietRepository.save({...existingDiet,...updateDietDto });
    return updatedDiet;
  }

  async remove(id: string) {
    const findDiet = this.findOne(id)
    if (!findDiet) throw new NotFoundException(`Diet with id ${id} Not Found`);
    const deleteDiet = await this.dietRepository.save({...findDiet, is_active : 0});
    return deleteDiet;
  }
}
