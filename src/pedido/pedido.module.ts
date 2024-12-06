import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pedido } from './entities/pedido.entity';
import { PedidosService } from './pedido.service';
import { PedidosController } from './pedido.controller';
import { ItemPedido } from './entities/item.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Pedido, ItemPedido])],
  providers: [PedidosService],
  controllers: [PedidosController],
})
export class PedidosModule {}
