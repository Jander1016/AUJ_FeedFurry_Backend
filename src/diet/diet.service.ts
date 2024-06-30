import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Food } from '../food/entities/food.entity';
import { Diet } from '../diet/entities/diet.entity';
import { DetailDiet } from '../detail-diet/entities/detail-diet.entity';
import { CreateDietDto, CreateDetailDietDto } from './dto/create-diet.dto';
import { UpdateDietDto } from './dto/update-diet.dto';
import { Pet } from '../pet/entities/pet.entity';

@Injectable()
export class DietService {
  constructor(
    @InjectRepository(Pet)
    private readonly petRepository: Repository<Pet>,
    @InjectRepository(Food)
    private readonly foodRepository: Repository<Food>,
    @InjectRepository(Diet)
    private readonly dietRepository: Repository<Diet>,
    @InjectRepository(DetailDiet)
    private readonly detailDietRepository: Repository<DetailDiet>,
  ) {}

  async generateAndSaveDiets(createDietDto: CreateDietDto): Promise<void> {

    const { pet_id } = createDietDto;
    const pet = await this.petRepository.findOne({
      where: { pet_id, is_active: 1 },
      relations: ['activity', 'condition'],
    });

    if (!pet)  throw new NotFoundException(`Pet with id ${pet_id} not found.`);

    const existingDietDto = await this.dietRepository.findOne({where: {pet_id, is_active: 1}});

    if (existingDietDto) throw new ConflictException('Diet already exists for pet:', pet.name);
    

    const foods = await this.foodRepository.find({ where: { is_active: 1 } });
    const dailyCalories = pet.ratio;
    const dietCombinations = this.generateDietCombinations(foods, dailyCalories);

    if (dietCombinations.length === 0) throw new NotFoundException(`No suitable food combinations found for pet: ${pet.name}`)
     // Limitando a un máximo de 3 combinaciones válidas
     const maxCombinations = 3;
     const validCombinations = dietCombinations.slice(0, maxCombinations);

    for (const combination of validCombinations) {
      const diet = new Diet();
      diet.pet = pet;

      const savedDiet = await this.dietRepository.save(diet);

      const detailDietEntries = combination.map(food => {
        const detailDiet = new DetailDiet();
        detailDiet.diet = savedDiet;
        detailDiet.food = food;
        detailDiet.diet_id = savedDiet.diet_id; // Set the diet_id
        detailDiet.food_id = food.food_id; // Set the food_id
        return detailDiet;
      });
      const saveDetailDiet = await this.detailDietRepository.save(detailDietEntries);
    }
  }

  private generateDietCombinations(foods: Food[], dailyCalories: number): Food[][] {
    const combinations: Food[][] = [];
    const tempCombination: Food[] = [];
    this.findCombinations(foods, dailyCalories, 0, tempCombination, combinations);
    return combinations;
  }

  private findCombinations(
    foods: Food[],
    targetCalories: number,
    startIndex: number,
    currentCombination: Food[],
    allCombinations: Food[][],
  ) {
    const currentCalories = currentCombination.reduce((sum, food) => sum + +food.calories, 0);

    if (currentCalories >= targetCalories * 0.95 && currentCalories <= targetCalories * 1.0) {
      allCombinations.push([...currentCombination]);
      if(allCombinations.length >=3 ) return;
      return
    }

    if (currentCalories > targetCalories) {
      return;
    }

    for (let i = startIndex; i < foods.length; i++) {
      currentCombination.push(foods[i]);
      this.findCombinations(foods, targetCalories, i + 1, currentCombination, allCombinations);
      currentCombination.pop();
    }
  }

  async findAll() {
    const listDiets = await this.dietRepository.find({
      relations: { 
        pet: true,
        detailDiets: { food: true },
      },
    });
    if (!listDiets || listDiets.length === 0) {
      throw new NotFoundException("Diets Not Found");
    }
    return listDiets;
  }

  async findOne(id: string) {
    const findDiet = await this.dietRepository.findOne({
      where: { diet_id: id },
      relations: {
        pet: true,
        detailDiets: {food: true},
      },
    });
    if (!findDiet) {
      throw new NotFoundException(`Diet with id ${id} Not Found`);
    }
    return findDiet;
  }

  // async update(id: string, updateDietDto: UpdateDietDto) {
  //   const existingDiet = await this.findOne(id);
  //   if (!existingDiet) {
  //     throw new NotFoundException(`Diet with id ${id} Not Found`);
  //   }

  //   if (updateDietDto.pet_id) {
  //     const pet = await this.petRepository.findOne({ where: { pet_id: updateDietDto.pet_id, is_active: 1 } });
  //     if (!pet) {
  //       throw new NotFoundException(`Pet with id ${updateDietDto.pet_id} not found.`);
  //     }
  //     existingDiet.pet = pet;
  //   }

  //   if (updateDietDto.detailDiets) {
  //     await this.detailDietRepository.delete({ diet: existingDiet });

  //     const detailDietEntries = updateDietDto.detailDiets.map(detail => {
  //       const detailDiet = new DetailDiet();
  //       detailDiet.diet = existingDiet;
  //       detailDiet.food = { food_id: detail.foodId } as Food; // Only setting the ID is sufficient
  //       detailDiet.diet_id = existingDiet.diet_id; // Set the diet_id
  //       detailDiet.food_id = detail.foodId; // Set the food_id
  //       return detailDiet;
  //     });

  //     await this.detailDietRepository.save(detailDietEntries);
  //   }

  //   return this.dietRepository.save(existingDiet);
  // }

  async remove(id: string) {
    const findDiet = await this.findOne(id);
    if (!findDiet) {
      throw new NotFoundException(`Diet with id ${id} Not Found`);
    }
    findDiet.is_active = 0;
    return this.dietRepository.save(findDiet);
  }
}
