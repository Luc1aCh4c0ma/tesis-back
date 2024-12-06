import { Categoria } from 'src/categorias/entities/categoria.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

@Entity('producto')
@Index('Producto_categoriaId_fkey', ['categoriaId'])
export class Producto {
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

  @ManyToOne(() => Categoria, (categoria) => categoria.productos, { eager: true })
  categoria: Categoria;

  @Column({ nullable: true })
  imagen: string;

  @CreateDateColumn()
  creadoEn: Date;

  @UpdateDateColumn()
  actualizadoEn: Date;
}
