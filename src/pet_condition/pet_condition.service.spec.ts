import { Test, TestingModule } from '@nestjs/testing';
import { PetConditionService } from './pet_condition.service';

describe('PetConditionService', () => {
  let service: PetConditionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PetConditionService],
    }).compile();

    service = module.get<PetConditionService>(PetConditionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
