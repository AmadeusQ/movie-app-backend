import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from 'typeorm';
import { Movie } from './Movie';
import { User } from './User';

@Entity({ name: 'favoritelists' })
export class Favoritelist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  movieId: number;

  @ManyToOne(() => User, (user) => user.favoritelists)
  @JoinColumn({ name: 'userId', referencedColumnName: 'userId' })
  user: User;

  @ManyToOne(() => Movie, (movie) => movie.favoritelists)
  @JoinColumn({ name: 'movieId', referencedColumnName: 'movieId' })
  movie: Movie;
}
