import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Actor } from './typeorm/entities/Actor';
import { Favoritelist } from './typeorm/entities/Favoritelist';
import { Genre } from './typeorm/entities/Genre';
import { Movie } from './typeorm/entities/Movie';
import { Rating } from './typeorm/entities/Rating';
import { Watchedlist } from './typeorm/entities/Watchedlist';
import { Watchlist } from './typeorm/entities/Watchlist';
import { ActorsModule } from './actors/actors.module';
import { MoviesModule } from './movies/movies.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { AdminsModule } from './admins/admins.module';
import { DefaultUser } from './typeorm/entities/DefaultUser';
import { Admin } from './typeorm/entities/Admin';
import { Token } from './typeorm/entities/Token';
import { GenresModule } from './genres/genres.module';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: parseInt(process.env.MYSQL_PORT),
      username: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      entities: [
        Actor,
        DefaultUser,
        Admin,
        Favoritelist,
        Genre,
        Movie,
        Rating,
        Watchedlist,
        Watchlist,
        Token,
      ],
      synchronize: true,
    }),
    ActorsModule,
    MoviesModule,
    UsersModule,
    AuthModule,
    AdminsModule,
    GenresModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
