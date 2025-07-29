import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { HackathonModule } from './hackathon/hackathon.module';
import { databaseConfig } from './config/database.config';

@Module({
  imports: [MongooseModule.forRoot(databaseConfig.uri), UsersModule, HackathonModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
