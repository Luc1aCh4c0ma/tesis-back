import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
  } from 'typeorm';
  
  @Entity('clientes') // Nombre de la tabla en la base de datos
  export class Cliente {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    nombre: string;
  
    @Column()
    apellido: string;
  
    @Column({ unique: true }) // Garantiza que los números de teléfono sean únicos
    telefono: string;
  
    @Column()
    mesa: string;

    @Column()
    metodoPago: string;
    
  }
  