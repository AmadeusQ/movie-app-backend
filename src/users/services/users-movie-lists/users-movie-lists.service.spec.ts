import { Test, TestingModule } from '@nestjs/testing';
import { UsersMovieListsService } from './users-movie-lists.service';

describe('UsersMovieListsService', () => {
  let service: UsersMovieListsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersMovieListsService],
    }).compile();

    service = module.get<UsersMovieListsService>(UsersMovieListsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
