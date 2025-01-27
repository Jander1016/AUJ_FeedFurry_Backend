import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PetTypeModule } from './pet-type/pet-type.module';
import { configDotenv } from 'dotenv';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { BreedModule } from './breed/breed.module';
import { ActivitiesModule } from './activities/activities.module';
import { PetConditionModule } from './pet-condition/pet-condition.module';
import { PetModule } from './pet/pet.module';
import { FoodModule } from './food/food.module';
import { DietModule } from './diet/diet.module';
import { DetailDietModule } from './detail-diet/detail-diet.module';
configDotenv()

@Module({
  imports: [TypeOrmModule.forRoot(
    {  
      type: 'mysql',
      host: process.env.MYSQLHOST ?? process.env.MYSQLDB_HOST_LOCAL,
      port: +process.env.MYSQLPORT ?? +process.env.MYSQLDB_TCP_PORT_LOCAL,
      username: process.env.MYSQLUSER ?? process.env.MYSQLDB_USER_LOCAL,
      password: process.env.MYSQL_ROOT_PASSWORD ?? process.env.MYSQLDB_ROOT_PASSWORD_LOCAL,
      database: process.env.MYSQLDATABASE ?? process.env.MYSQLDB_NAME_LOCAL,
      autoLoadEntities: true,
      synchronize: false,
    }
  ),
    PetTypeModule,
    UsersModule,
    AuthModule,
    BreedModule,
    ActivitiesModule,
    PetConditionModule,
    PetModule,
    FoodModule,
    DietModule,
    DetailDietModule
  ]
})
export class AppModule { }
