import { PartialType } from '@nestjs/swagger';
import { CreateDetailDietDto, CreateDietDto } from './create-diet.dto';

export class UpdateDietDto extends PartialType(CreateDietDto) {
  petId?: string;
  detailDiets?: CreateDetailDietDto[];
}
