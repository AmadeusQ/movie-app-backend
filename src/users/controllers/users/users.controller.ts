import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { UpdateUserDto } from 'src/users/dtos/UpdateUser.dto';
import { UsersMovieListsService } from 'src/users/services/users-movie-lists/users-movie-lists.service';
import { UsersService } from 'src/users/services/users/users.service';
import { MovieId } from 'src/utils/types';

@Controller('api/users')
export class UsersController {
  constructor(
    private usersSerivce: UsersService,
    private userMovieListsService: UsersMovieListsService,
  ) {}
  @Get()
  async getUsers() {
    const users = await this.usersSerivce.findUsers();
    return users;
  }

  @Get('id/:userId')
  async getUserById(@Param('userId', ParseIntPipe) userId: number) {
    const user = await this.usersSerivce.findUserById(userId);
    return user;
  }

  @Get('username/:username')
  async getUserByUsername(@Param('username') username: string) {
    const user = await this.usersSerivce.findUserByUsername(username);
    return user;
  }

  @Get('id/:userId/watchedlist')
  async getMoviesFromWatchedlist(
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    const watchedlist =
      await this.userMovieListsService.getMoviesFromWatchedlist(userId);
    return watchedlist;
  }

  @Get('id/:userId/watchlist')
  async getMoviesFromWatchlist(@Param('userId', ParseIntPipe) userId: number) {
    const watchedlist = await this.userMovieListsService.getMoviesFromWatchlist(
      userId,
    );
    return watchedlist;
  }

  @Get('id/:userId/favorite')
  async getMoviesFromFavoritelist(
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    const watchedlist =
      await this.userMovieListsService.getMoviesFromFavoritelist(userId);
    return watchedlist;
  }

  @Post('id/:userId/watchedlist')
  async addMovieToWatchedlist(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() movieId: MovieId,
  ) {
    await this.userMovieListsService.addMovieToWatchedlist(
      userId,
      movieId.movieId,
    );
    return 'Movie successfully added to watchedlist';
  }

  @Post('id/:userId/watchlist')
  async addMovieToWatchlist(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() movieId: MovieId,
  ) {
    await this.userMovieListsService.addMovieToWatchlist(
      userId,
      movieId.movieId,
    );
    return 'Movie successfully added to watchlist';
  }

  @Post('id/:userId/favorite')
  async addMovieToFavoritelist(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() movieId: MovieId,
  ) {
    await this.userMovieListsService.addMovieToFavoritelist(
      userId,
      movieId.movieId,
    );
    return 'Movie successfully added to favoritelist';
  }

  @Delete('id/:userId/watchedlist/:movieId')
  async DeleteMovieFromWatchedlist(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('movieId', ParseIntPipe) movieId: number,
  ) {
    await this.userMovieListsService.deleteMovieFromWatchedlist(
      userId,
      movieId,
    );
  }

  @Delete('id/:userId/watchlist/:movieId')
  async DeleteMovieFromWatchlist(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('movieId', ParseIntPipe) movieId: number,
  ) {
    await this.userMovieListsService.deleteMovieFromWatchlist(userId, movieId);
  }

  @Delete('id/:userId/favorite/:movieId')
  async DeleteMovieFromFavoritelist(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('movieId', ParseIntPipe) movieId: number,
  ) {
    await this.userMovieListsService.deleteMovieFromFavoritelist(
      userId,
      movieId,
    );
  }

  @Put('id/:userId')
  async updateUserById(
    @Param('userId') userId: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    await this.usersSerivce.updateUser(userId, updateUserDto);
  }

  @Delete('id/:userId')
  async deleteUserById(@Param('userId', ParseIntPipe) userId: number) {
    await this.userMovieListsService.deleteUserWatchlist(userId);
    await this.userMovieListsService.deleteUserWatchedlist(userId);
    await this.userMovieListsService.deleteUserFavoritelist(userId);
    await this.usersSerivce.deleteUser(userId);
  }
}
