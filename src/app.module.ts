import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeORMError } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forRoot(
    {
      type: 'mysql',
      host: 'mysql_db',
      port: 3307,
      username: 'testuser',
      password: 'testpassword',
      database: 'db_nestjs',
      entities: [],
      synchronize: true,
    } 
  )],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
