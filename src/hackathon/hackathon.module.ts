import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HackathonService } from './hackathon.service';
import { HackathonController } from './hackathon.controller';
import { Hackathon, HackathonSchema } from './entities/hackathon.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: Hackathon.name, schema: HackathonSchema }])],
  controllers: [HackathonController],
  providers: [HackathonService],
})
export class HackathonModule {}
