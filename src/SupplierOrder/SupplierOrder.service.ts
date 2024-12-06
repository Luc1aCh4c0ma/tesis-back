import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SupplierOrder } from './entities/SupplierOrder.entity';

@Injectable()
export class SupplierOrderService {
  constructor(
    @InjectRepository(SupplierOrder)
    private readonly supplierOrderRepository: Repository<SupplierOrder>,
  ) {}

  create(order: Partial<SupplierOrder>) {
    return this.supplierOrderRepository.save(order);
  }

  findAll() {
    return this.supplierOrderRepository.find();
  }

  markAsReceived(id: number) {
    return this.supplierOrderRepository.update(id, { isReceived: true });
  }
}
