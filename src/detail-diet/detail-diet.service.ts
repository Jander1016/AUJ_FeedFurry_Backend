import { Injectable } from '@nestjs/common';
import { CreateDetailDietDto } from './dto/create-detail-diet.dto';
import { UpdateDetailDietDto } from './dto/update-detail-diet.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DetailDiet } from './entities/detail-diet.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DetailDietService {
  constructor(
    @InjectRepository(DetailDiet)
    private readonly detailDietRepository: Repository<DetailDiet>
  ){}
  async create(createDetailDietDto: CreateDetailDietDto) {
    return await this.detailDietRepository.save(createDetailDietDto)
  }

  findAll() {
    return `This action returns all detailDiet`;
  }

  findOne(id: number) {
    return `This action returns a #${id} detailDiet`;
  }

  update(id: number, updateDetailDietDto: UpdateDetailDietDto) {
    return `This action updates a #${id} detailDiet`;
  }

  remove(id: number) {
    return `This action removes a #${id} detailDiet`;
  }
}
