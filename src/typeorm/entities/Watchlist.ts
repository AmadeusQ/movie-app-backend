import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from 'typeorm';
import { Movie } from './Movie';
import { User } from './User';

@Entity({ name: 'watchlists' })
export class Watchlist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  movieId: number;

  @ManyToOne(() => User, (user) => user.watchlists)
  @JoinColumn({ name: 'userId', referencedColumnName: 'userId' })
  user: User;

  @ManyToOne(() => Movie, (movie) => movie.watchlists)
  @JoinColumn({ name: 'movieId', referencedColumnName: 'movieId' })
  movie: Movie;
}
