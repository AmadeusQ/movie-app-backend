import { Module } from '@nestjs/common';
import { ActorsController } from './controllers/actors/actors.controller';
import { ActorsService } from './services/actors/actors.service';

@Module({
  controllers: [ActorsController],
  providers: [ActorsService],
})
export class ActorsModule {}
