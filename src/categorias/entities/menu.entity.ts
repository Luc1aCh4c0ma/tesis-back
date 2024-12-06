import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
    Index,
  } from 'typeorm';
  import { Categoria } from './categoria.entity';
  
  @Entity('menu')
  @Index('Menu_categoriaId_fkey', ['categoriaId'])
  export class Menu {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    nombre: string;
  
    @Column({ nullable: true })
    descripcion: string;
  
    @Column('float')
    precio: number;
  
    @Column({ default: true })
    disponible: boolean;
  
    @Column()
    categoriaId: number;
  
    @ManyToOne(() => Categoria, (categoria) => categoria.menus)
    categoria: Categoria;
  
    @Column({ nullable: true })
    imagenUrl: string;
  
    @CreateDateColumn()
    creadoEn: Date;
  
    @UpdateDateColumn()
    actualizadoEn: Date;
  }
  