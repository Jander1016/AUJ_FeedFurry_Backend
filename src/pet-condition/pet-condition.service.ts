import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePetConditionDto } from './dto/create-pet-condition.dto';
import { UpdatePetConditionDto } from './dto/update-pet-condition.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PetCondition } from './entities/pet-condition.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PetConditionService {
  constructor(
    @InjectRepository(PetCondition)
    private readonly petConditionRepository: Repository<PetCondition>,
  ){}
  async create(createPetConditionDto: CreatePetConditionDto) {
    const esxistPetCondition = await this.petConditionRepository.findOne(
      {
        where:
        {
          description: createPetConditionDto.description
        }
      }
    )
    if(esxistPetCondition) throw new BadRequestException("Pet Condition Already Exist");

    const newPetCondition = this.petConditionRepository.save(createPetConditionDto);

    return newPetCondition
  }

  async findAll() {
    const listPetConditions = await this.petConditionRepository.find();
    if(!listPetConditions || listPetConditions.length === 0) throw new NotFoundException("Pet Conditions Not Found");
    return listPetConditions;
  }

  async findOne(id: string) {
    const existPetCondition = await this.petConditionRepository.findOne(
      {
        where:
        {
          condition_id :  id
        }
      }
    );
    if (!existPetCondition) throw new NotFoundException(`pet Condition with id ${id} not found`);
    return existPetCondition;
  }

  async update(id: string, updatePetConditionDto: UpdatePetConditionDto) {
    const petCondition = await this.findOne(id);
    if(!petCondition) throw new NotFoundException(`pet Condition with id ${id} not found`);
    const updatedPetCondition = this.petConditionRepository.save({...petCondition,...updatePetConditionDto });
    return updatedPetCondition
  }

  remove(id: string) {
    return `This action removes a #${id} petCondition`;
  }
}
