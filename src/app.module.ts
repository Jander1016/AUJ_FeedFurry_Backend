import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PetConditionModule } from './pet_condition/pet_condition.module';

@Module({
  imports: [PetConditionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
