import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PetTypeModule } from './pet-type/pet-type.module';
import { PetType } from './pet-type/entities/pet-type.entity';
import { configDotenv } from 'dotenv';
configDotenv()

@Module({
  imports: [TypeOrmModule.forRoot(
    {  
      type: 'mysql',
      host: process.env.MYSQLDB_HOST_LOCAL || process.env.MYSQLDB_USER,
      port: +process.env.MYSQLDB_TCP_PORT_LOCAL || +process.env.MYSQLDB_TCP_PORT,
      username: process.env.MYSQLDB_USER_LOCAL || process.env.MYSQLDB_USER,
      password: process.env.MYSQLDB_ROOT_PASSWORD_LOCAL || process.env.MYSQLDB_ROOT_PASSWORD,
      database: process.env.MYSQLDB_NAME_LOCAL || process.env.MYSQLDB_NAME,
      entities: [PetType],
      synchronize: false,
    }
  ),
    PetType,
    PetTypeModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
