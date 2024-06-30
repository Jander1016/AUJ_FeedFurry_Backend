import { PartialType } from '@nestjs/swagger';
import { CreateDetailDietDto } from './create-detail-diet.dto';

export class UpdateDetailDietDto extends PartialType(CreateDetailDietDto) {}
