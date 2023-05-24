import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from 'typeorm';
import { Movie } from './Movie';
import { User } from './User';

@Entity({ name: 'watchedlists' })
export class Watchedlist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  movieId: number;

  @ManyToOne(() => User, (user) => user.watchedlists)
  @JoinColumn({ name: 'userId', referencedColumnName: 'userId' })
  user: User;

  @ManyToOne(() => Movie, (movie) => movie.watchedlists)
  @JoinColumn({ name: 'movieId', referencedColumnName: 'movieId' })
  movie: Movie;
}
