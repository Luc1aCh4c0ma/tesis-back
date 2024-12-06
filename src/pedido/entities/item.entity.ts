import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Pedido } from "./pedido.entity";

@Entity('items')
export class ItemPedido {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Pedido, (pedido) => pedido.items, { onDelete: 'CASCADE' })
  pedido: Pedido;
  

  @Column()
  nombre: string;

  @Column('int')
  cantidad: number;

  @Column('decimal', { precision: 10, scale: 2 })
  precio: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
