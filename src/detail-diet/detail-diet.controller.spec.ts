import { Test, TestingModule } from '@nestjs/testing';
import { DetailDietController } from './detail-diet.controller';
import { DetailDietService } from './detail-diet.service';

describe('DetailDietController', () => {
  let controller: DetailDietController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DetailDietController],
      providers: [DetailDietService],
    }).compile();

    controller = module.get<DetailDietController>(DetailDietController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
