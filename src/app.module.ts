import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PetTypeModule } from './pet-type/pet-type.module';
import { PetType } from './pet-type/entities/pet-type.entity';
import { configDotenv } from 'dotenv';
import { AuthModule } from './auth/auth.module';
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
      entities: [PetType],
      synchronize: false,
    }
  ),
    PetType,
    PetTypeModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
