import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users/users.controller';
import { UsersService } from './services/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DefaultUser } from 'src/typeorm/entities/DefaultUser';
import { Watchedlist } from 'src/typeorm/entities/Watchedlist';
import { Watchlist } from 'src/typeorm/entities/Watchlist';
import { Favoritelist } from 'src/typeorm/entities/Favoritelist';
import { UsersMovieListsService } from './services/users-movie-lists/users-movie-lists.service';
import { Token } from 'src/typeorm/entities/Token';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      DefaultUser,
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