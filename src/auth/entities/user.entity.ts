import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column({ default: 'socio' }) // Puede ser 'socio' o 'admin'
  role: string;

  @Column({ default: false })
  acceptedTerms: boolean;
}
