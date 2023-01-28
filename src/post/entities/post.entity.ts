import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Photo from './post-photo.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @OneToMany(() => Photo, (photo) => photo.post)
  photos: Photo[];
}
