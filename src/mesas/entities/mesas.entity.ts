import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('mesas')
export class Mesa {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  numero: number;

  @Column({ default: true }) // Define el estado por defecto como habilitado
  isAvailable: boolean;
}
