import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Pet } from './entities/pet.entity';
import { Repository } from 'typeorm';
import { AGE_FACTOR } from 'src/utils/tableAgeFactor';

@Injectable()
export class PetService {
  constructor(
    @InjectRepository(Pet)
    private readonly petRepository: Repository<Pet>
  ) { }
  async create(createPetDto: CreatePetDto) {
   
    const createPet = await this.petRepository.save(createPetDto);

    const findPet = await this.findOne( createPet.pet_id  );
    
    const ageFactor= AGE_FACTOR.find(item => item.age === createPet.age)
    
    const kleiber: number = 70 * Math.pow(createPet.weight, 0.75);
    const metabolicRate: number =   kleiber * findPet[0].activity.factor_value * findPet[0].condition.factor_value * ageFactor.factor;
    
    const newPet = await this.petRepository.save({...createPet, ratio: metabolicRate})
    
    return newPet;
  }

  async findAll() {
    const listPets = await this.petRepository.find(
      {
        relations: {
          petType: true,
          condition: true,
          activity: true,
          user:true
        }
      },
    );
    if (!listPets || listPets.length === 0) throw new NotFoundException("Pets Not Found");

    const result = listPets.map(pet => ({
      ...pet,
      user: {
        user_id: pet.user.user_id,
        name: pet.user.name,
        lastname: pet.user.lastname,
        email: pet.user.email,
        phone: pet.user.phone,
        role: pet.user.role
      }
    }));
    return result;
  }

  async findOne(id: string) {
    const existingPet = await this.petRepository.findOne(
      {
        where: { pet_id: id },
        relations: {
          petType: true,
          condition: true,
          activity: true,
          user: true,
        }
      },
    )
    if (!existingPet) throw new NotFoundException(`Pet with id ${id} Not Found`);
    const result = [existingPet]?.map(pet => ({
      ...pet,
      user: {
        user_id: pet.user.user_id,
        name: pet.user.name,
        lastname: pet.user.lastname,
        email: pet.user.email,
        phone: pet.user.phone,
        role: pet.user.role
      }
    }));
    return result;
  }

  async update(id: string, updatePetDto: UpdatePetDto) {
    const existingPet = await this.findOne(id);
    if (!existingPet) throw new NotFoundException(`Pet with id ${id} Not Found`);
    const updatedPet = await this.petRepository.save({ ...existingPet, ...updatePetDto });
    return updatedPet;
  }

  remove(id: string) {
    return `This action removes a #${id} pet`;
  }
}
