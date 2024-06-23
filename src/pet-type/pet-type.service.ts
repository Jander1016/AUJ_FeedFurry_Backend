import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePetTypeDto } from './dto/create-pet-type.dto';
import { UpdatePetTypeDto } from './dto/update-pet-type.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PetType } from './entities/pet-type.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PetTypeService {
  constructor(
    @InjectRepository(PetType)
    private readonly petTypeRepository: Repository<PetType>,
  ) { }
  async create(createPetTypeDto: CreatePetTypeDto) {
    return await this.petTypeRepository.save(createPetTypeDto);
  }

  async findAll() {
    const listPetTypes = await this.petTypeRepository.find(
      {
        relations: {
          breeds: true,
          pets: true,
        }
      }
    )
    if (!listPetTypes) throw new NotFoundException("Pet Types Not Found");
    return listPetTypes;
  }

   findOne(id: string) {
    const type =  this.petTypeRepository.findOne({
      where: { pet_type_id: id }, 
      relations: {
        breeds: true,
        pets: true,
      }
    });
    if (!type) throw new NotFoundException(`Pet Type with id ${id} Not Found`);
    return type;
  }

  async update(id: string, updatePetTypeDto: UpdatePetTypeDto): Promise<PetType> {
    const existingPetType =  this.findOne( id );
    if (!existingPetType) throw new NotFoundException(`Pet Type with id ${id} Not Found`);

    const updatedPetType = await this.petTypeRepository.save({ ...existingPetType, ...updatePetTypeDto });
    return updatedPetType;
  }

  async remove(id: string) {
    const existingPetType = await this.petTypeRepository.findOne({ where: { pet_type_id: id } });
    if (!existingPetType) throw new NotFoundException(`Pet Type with id ${id} Not Found`);
    return this.petTypeRepository.delete(id);
  }
}
