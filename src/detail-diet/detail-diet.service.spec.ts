import { Test, TestingModule } from '@nestjs/testing';
import { DetailDietService } from './detail-diet.service';

describe('DetailDietService', () => {
  let service: DetailDietService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DetailDietService],
    }).compile();

    service = module.get<DetailDietService>(DetailDietService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
