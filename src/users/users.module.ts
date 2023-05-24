import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import { Watchedlist } from 'src/typeorm/entities/Watchedlist';
import { Watchlist } from 'src/typeorm/entities/Watchlist';
import { Favoritelist } from 'src/typeorm/entities/Favoritelist';
import { UsersMovieListsService } from './users-movie-lists.service';
import { Token } from 'src/typeorm/entities/Token';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Watchedlist,
      Watchlist,
      Favoritelist,
      Token,
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersMovieListsService],
  exports: [UsersService],
})
export class UsersModule {}
