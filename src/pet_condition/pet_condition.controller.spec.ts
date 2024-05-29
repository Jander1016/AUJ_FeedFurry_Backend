import { Test, TestingModule } from '@nestjs/testing';
import { PetConditionController } from './pet_condition.controller';
import { PetConditionService } from './pet_condition.service';

describe('PetConditionController', () => {
  let controller: PetConditionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PetConditionController],
      providers: [PetConditionService],
    }).compile();
    
    controller = module.get<PetConditionController>(PetConditionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});