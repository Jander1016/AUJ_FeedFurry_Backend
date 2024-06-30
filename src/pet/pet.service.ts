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

  private calculateDailyCalories(pet): number { 
    
    const kleiber: number = 70 * Math.pow(pet.weight, 0.75);

    let mcr: number =   kleiber * pet.activity.factor_value * pet.condition.factor_value;

    if (pet.age <= 1) {
      mcr *= 2.0;
    } else if (pet.age > 1 && pet.age <= 7) {
      mcr *= 1.0;
    } else {
      mcr *= 0.8;
    }

    return mcr
  }
  async create(createPetDto: CreatePetDto) {
   
    const createPet = await this.petRepository.save(createPetDto);

    const findPet = await this.findOne( createPet.pet_id  );

    const metabolicCaloricRequirement  = this.calculateDailyCalories(findPet[0]);

     const newPet = await this.petRepository.save({...createPet, ratio: metabolicCaloricRequirement})

    return newPet;
  }

  async findAll() {
    const listPets = await this.petRepository.find(
      { 
        where: { is_active: 1 } ,
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
        where: { 
          pet_id: id,
          is_active: 1
        },
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

  async remove(id: string) {
    const existingPet = await this.findOne(id);
    if (!existingPet) throw new NotFoundException(`Pet with id ${id} Not Found`);
    const deletePet = await this.petRepository.save({...existingPet, is_active: 0});
    return deletePet
  }
}
