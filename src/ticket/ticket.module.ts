import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketController } from './ticket.controller';
import { PedidosService } from 'src/pedido/pedido.service';
import { Pedido } from 'src/pedido/entities/pedido.entity';
import { ItemPedido } from 'src/pedido/entities/item.entity';
import { TicketService } from './ticket.service';

@Module({
  imports: [TypeOrmModule.forFeature([Pedido, ItemPedido])],
  controllers: [TicketController],
  providers: [TicketService, PedidosService],
})
export class TicketModule {}
