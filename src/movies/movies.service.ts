import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from 'src/typeorm/entities/Movie';
import { CreateMovieParams, UpdateMovieParams } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie) private movieRepository: Repository<Movie>,
  ) {}

  async findMovies() {
    return this.movieRepository.find({
      relations: ['actors', 'genres'],
    });
  }

  async findMovieById(movieId: number) {
    const movie = await this.movieRepository.findOne({
      where: { movieId },
      relations: ['actors', 'genres'],
    });
    if (!movie) {
      throw new HttpException('Movie not found', HttpStatus.NOT_FOUND);
    }
    return movie;
  }

  async findMoviesByGenre(genreId: number) {
    const movies = await this.movieRepository
      .createQueryBuilder('movie')
      .innerJoinAndSelect('movie.genres', 'genre')
      .where('genre.genreId = :genreId', { genreId })
      .getMany();

    return movies;
  }

  async createMovie(movieParams: CreateMovieParams) {
    const newMovie = this.movieRepository.create(movieParams);
    return this.movieRepository.save(newMovie);
  }

  async updateMovie(movieId: number, updateMovieParams: UpdateMovieParams) {
    return this.movieRepository.update({ movieId }, { ...updateMovieParams });
  }

  async deleteMovie(movieId: number) {
    return this.movieRepository.delete({ movieId });
  }
}
