import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBreedDto } from './dto/create-breed.dto';
import { UpdateBreedDto } from './dto/update-breed.dto';
import { Repository } from 'typeorm';
import { Breed } from './entities/breed.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PetTypeService } from 'src/pet-type/pet-type.service';

@Injectable()
export class BreedService {
  constructor(
    @InjectRepository(Breed)
    private readonly breedRepository: Repository<Breed>,
    private readonly petTypeService: PetTypeService,
  ){}
  async create(createBreedDto: CreateBreedDto) {
    const petType = await this.petTypeService.findOne(createBreedDto.pet_type_id);
    if(!petType) throw new NotFoundException(`Pet Type with id ${createBreedDto.pet_type_id} Not Found`);
    
    const newBreed = this.breedRepository.create({...createBreedDto, petType: petType});

    return this.breedRepository.save(newBreed);
  }

  async findAll() {
    const listBreeds= this.breedRepository.find(
      {
        relations:
        {
          petType: true,
        }
      }
    );
    if(!listBreeds) throw new NotFoundException("Breeds Not Found");
    return listBreeds;
  }

  async findOne(id: string) {
    const oneBreed=  await this.breedRepository.findOne(
      {
        where: { breed_id : id },
        relations:
        {
          petType: true,
        }
      }
    );
    if(!oneBreed) throw new NotFoundException(`Breed with id ${id} Not Found`);
    return oneBreed;
  }

  async update(id: string, updateBreedDto: UpdateBreedDto) {
    const existingBreed = await this.findOne(id);
    if(!existingBreed) throw new NotFoundException(`Breed with id ${id} Not Found`);
  
    const updatedBreed = await this.breedRepository.save({...existingBreed,...updateBreedDto });
    return updatedBreed
  }

  remove(id: string) {
    return `This action removes a #${id} breed`;
  }
}
