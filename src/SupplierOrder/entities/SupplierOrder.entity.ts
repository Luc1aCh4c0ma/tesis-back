import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('supplier_orders')
export class SupplierOrder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  sellerName: string;

  @Column()
  sellerAddress: string;

  @Column()
  buyerName: string;

  @Column()
  buyerAddress: string;

  @Column()
  orderDate: Date;

  @Column()
  orderNumber: string;

  @Column('text')
  itemDescription: string;

  @Column('float')
  totalAmount: number;

  @Column('float')
  quantity: number;

  @Column()
  expectedDeliveryDate: Date;

  @Column({ default: false })
  isReceived: boolean;
}
