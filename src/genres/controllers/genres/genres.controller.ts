import { Controller, Get } from '@nestjs/common';
import { GenresService } from 'src/genres/services/genres/genres.service';

@Controller('api/genres')
export class GenresController {
  constructor(private genresService: GenresService) {}

  @Get()
  async getGenres() {
    const genres = await this.genresService.findGenres();
    return genres;
  }
}
