import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class Avatar {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public key: string;
}

export default Avatar;
