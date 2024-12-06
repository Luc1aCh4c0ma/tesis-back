import { Controller, Post, Get, Body, Param, Patch } from '@nestjs/common';
import { SupplierOrderService } from './SupplierOrder.service';
import { SupplierOrder } from './entities/SupplierOrder.entity';


@Controller('supplier-orders')
export class SupplierOrderController {
  constructor(private readonly supplierOrderService: SupplierOrderService) {}

  @Post()
  create(@Body() order: Partial<SupplierOrder>) {
    return this.supplierOrderService.create(order);
  }

  @Get()
  findAll() {
    return this.supplierOrderService.findAll();
  }

  @Patch(':id/received')
  markAsReceived(@Param('id') id: number) {
    return this.supplierOrderService.markAsReceived(id);
  }
}
