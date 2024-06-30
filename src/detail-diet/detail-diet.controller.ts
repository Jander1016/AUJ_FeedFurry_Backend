import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DetailDietService } from './detail-diet.service';
import { CreateDetailDietDto } from './dto/create-detail-diet.dto';
import { UpdateDetailDietDto } from './dto/update-detail-diet.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('detail-diet')
@ApiTags("Detail Diet")
export class DetailDietController {
  constructor(private readonly detailDietService: DetailDietService) {}

  @Post()
  create(@Body() createDetailDietDto: CreateDetailDietDto) {
    return this.detailDietService.create(createDetailDietDto);
  }

  @Get()
  findAll() {
    return this.detailDietService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.detailDietService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDetailDietDto: UpdateDetailDietDto) {
    return this.detailDietService.update(+id, updateDetailDietDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.detailDietService.remove(+id);
  }
}
