import { HttpException, Injectable } from '@nestjs/common';
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
  ){}
  async create(createPetTypeDto: CreatePetTypeDto) {
    return await this.petTypeRepository.save(createPetTypeDto);
  }

  async findAll() {
    const listPetTypes = await this.petTypeRepository.find()
    if(!listPetTypes) throw new HttpException("Pet Types Not Found", 404);
    return listPetTypes;
  }

  findOne(id: string) {
    return `This action returns a #${id} petType`;
  }

  update(id: string, updatePetTypeDto: UpdatePetTypeDto) {
    return `This action updates a #${id} petType`;
  }

  remove(id: string) {
    return `This action removes a #${id} petType`;
  }
}
