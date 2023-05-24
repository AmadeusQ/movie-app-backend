import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Movie } from './Movie';
import { User } from './User';

@Entity({ name: 'ratings' })
export class Rating {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  rating: number;

  @ManyToOne(() => User, (user) => user.ratings)
  user: User;

  @ManyToOne(() => Movie, (movie) => movie.ratings)
  movie: Movie;
}
