import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  email: string;

  @Column()
  name: string;

  @Column()
  givenName: string;

  @Column()
  familyName: string;

  @Column()
  picture: string;
}
