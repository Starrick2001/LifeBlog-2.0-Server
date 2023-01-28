import { Post } from 'src/post/entities/post.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
class Photo {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public key: string;

  @ManyToOne(() => Post, (post) => post.photos)
  @JoinColumn()
  public post: Post;
}

export default Photo;
