import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  ParseIntPipe,
  Body,
} from '@nestjs/common';
import { CreateMovieDto } from 'src/movies/dtos/CreateMovie.dto';
import { UpdateMovieDto } from 'src/movies/dtos/UpdateMovie.dto';
import { MoviesService } from 'src/movies/movies.service';

@Controller('api/movies')
export class MoviesController {
  constructor(private moviesService: MoviesService) {}
  @Get()
  async getMovies() {
    const movies = await this.moviesService.findMovies();
    return movies;
  }

  @Get(':movieId')
  async getMovieById(@Param('movieId', ParseIntPipe) movieId: number) {
    const movie = await this.moviesService.findMovieById(movieId);
    return movie;
  }

  @Get('genre/:genreId')
  async getMoviesByGenre(@Param('genreId', ParseIntPipe) genreId: number) {
    const movies = await this.moviesService.findMoviesByGenre(genreId);
    return movies;
  }

  @Post()
  async createMovie(@Body() createMovieDto: CreateMovieDto) {
    const movie = await this.moviesService.createMovie(createMovieDto);
    return movie;
  }

  @Put(':movieId')
  async updateMovieById(
    @Param('movieId', ParseIntPipe) movieId: number,
    @Body() updateMovieDto: UpdateMovieDto,
  ) {
    await this.moviesService.updateMovie(movieId, updateMovieDto);
  }

  @Delete(':movieId')
  async deleteMovieById(@Param('movieId', ParseIntPipe) movieId: number) {
    await this.moviesService.deleteMovie(movieId);
  }
}
