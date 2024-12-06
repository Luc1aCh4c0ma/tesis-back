import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupplierOrder } from './entities/SupplierOrder.entity';
import { SupplierOrderService } from './SupplierOrder.service';
import { SupplierOrderController } from './SupplierOrder.controller';


@Module({
  imports: [TypeOrmModule.forFeature([SupplierOrder])],
  providers: [SupplierOrderService],
  controllers: [SupplierOrderController],
})
export class SupplierOrderModule {}
