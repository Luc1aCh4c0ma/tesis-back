import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { ItemPedido } from './item.entity';

@Entity('pedidos')
export class Pedido {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => ItemPedido, (itemPedido) => itemPedido.pedido, { cascade: true })
items: ItemPedido[];


  @Column('decimal', { precision: 10, scale: 2 })
  total: number;

  @Column()
  metodoPago: string;

  @Column({ default: 'pendiente' })
  estado: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}


