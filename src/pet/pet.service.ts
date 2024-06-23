import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Pet } from './entities/pet.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PetService {
  constructor(
    @InjectRepository(Pet)
    private readonly petRepository: Repository<Pet>
  ) { }
  async create(createPetDto: CreatePetDto) {
    const newPet = await this.petRepository.save(createPetDto);
    return newPet;
  }

  async findAll() {
    const listPets = await this.petRepository.find(
      {
        relations: {
          petType: true,
          condition: true,
          activity: true
        }
      },
    );
    if (!listPets || listPets.length === 0) throw new NotFoundException("Pets Not Found");
    return listPets;
  }

  async findOne(id: string) {
    const existingPet = await this.petRepository.findOne(
      {
        where: { pet_id: id },
        relations: {
          petType: true,
          condition: true,
          activity: true
        }
      },
    )
    if (!existingPet) throw new NotFoundException(`Pet with id ${id} Not Found`);
    return existingPet;
  }

  async update(id: string, updatePetDto: UpdatePetDto) {
    const existingPet = await this.findOne(id);
    if (!existingPet) throw new NotFoundException(`Pet with id ${id} Not Found`);
    const updatedPet = await this.petRepository.save({ ...existingPet, ...updatePetDto });
    return updatedPet;
  }

  remove(id: string, updatePetDto: UpdatePetDto) {
    return `This action removes a #${id} pet`;
  }
}
