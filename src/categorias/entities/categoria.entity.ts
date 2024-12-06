import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
  } from 'typeorm';
  import { Menu } from './menu.entity';
import { Producto } from 'src/productos/entities/product.entity';
  
  @Entity('categoria')
  export class Categoria {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    nombre: string;
  
    @OneToMany(() => Producto, (producto) => producto.categoria)
    productos: Producto[];
  
    @OneToMany(() => Menu, (menu) => menu.categoria)
    menus: Menu[];
  }
  