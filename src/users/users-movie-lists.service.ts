import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Favoritelist } from 'src/typeorm/entities/Favoritelist';
import { Watchedlist } from 'src/typeorm/entities/Watchedlist';
import { Watchlist } from 'src/typeorm/entities/Watchlist';
import { Repository } from 'typeorm';

@Injectable()
export class UsersMovieListsService {
  constructor(
    @InjectRepository(Watchedlist)
    private watchedlistRepository: Repository<Watchedlist>,
    @InjectRepository(Watchlist)
    private watchlistRepository: Repository<Watchlist>,
    @InjectRepository(Favoritelist)
    private favoritelistRepository: Repository<Favoritelist>,
  ) {}

  async getMoviesFromWatchedlist(userId: number) {
    const watchedlist = await this.watchedlistRepository.find({
      where: { userId },
      relations: ['movie'],
      select: ['movie'],
    });
    return watchedlist;
  }

  async getMoviesFromWatchlist(userId: number) {
    const watchlist = await this.watchlistRepository.find({
      where: { userId },
      relations: ['movie'],
      select: ['movie'],
    });
    return watchlist;
  }

  async getMoviesFromFavoritelist(userId: number) {
    const favoritelist = await this.favoritelistRepository.find({
      where: { userId },
      relations: ['movie'],
      select: ['movie'],
    });
    return favoritelist;
  }

  async addMovieToWatchedlist(userId: number, movieId: number) {
    const isAdded = await this.watchedlistRepository.findOne({
      where: { userId, movieId },
    });
    if (isAdded) {
      throw new HttpException('Movie already added', HttpStatus.BAD_REQUEST);
    }
    const newItem = this.watchedlistRepository.create({
      userId,
      movieId,
    });
    await this.watchedlistRepository.save(newItem);
  }

  async addMovieToWatchlist(userId: number, movieId: number) {
    const isAdded = await this.watchlistRepository.findOne({
      where: { userId, movieId },
    });
    if (isAdded) {
      throw new HttpException('Movie already added', HttpStatus.BAD_REQUEST);
    }
    const newItem = this.watchlistRepository.create({
      userId,
      movieId,
    });
    await this.watchlistRepository.save(newItem);
  }

  async addMovieToFavoritelist(userId: number, movieId: number) {
    const isAdded = await this.favoritelistRepository.findOne({
      where: { userId, movieId },
    });
    if (isAdded) {
      throw new HttpException('Movie already added', HttpStatus.BAD_REQUEST);
    }
    const newItem = this.favoritelistRepository.create({
      userId,
      movieId,
    });
    await this.favoritelistRepository.save(newItem);
  }

  async deleteMovieFromWatchedlist(userId: number, movieId: number) {
    await this.watchedlistRepository.delete({ userId, movieId });
  }

  async deleteMovieFromWatchlist(userId: number, movieId: number) {
    await this.watchlistRepository.delete({ userId, movieId });
  }

  async deleteMovieFromFavoritelist(userId: number, movieId: number) {
    await this.favoritelistRepository.delete({ userId, movieId });
  }

  async deleteUserWatchedlist(userId: number) {
    await this.watchedlistRepository.delete({ userId });
  }

  async deleteUserWatchlist(userId: number) {
    await this.watchlistRepository.delete({ userId });
  }

  async deleteUserFavoritelist(userId: number) {
    await this.favoritelistRepository.delete({ userId });
  }
}
