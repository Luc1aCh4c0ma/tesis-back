import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { PedidosService } from 'src/pedido/pedido.service';
import { TicketService } from './ticket.service';

@Controller('tickets')
export class TicketController {
  constructor(
    private readonly ticketService: TicketService,
    private readonly pedidoService: PedidosService,
  ) {}

  @Get(':id')
  async generarTicket(@Param('id') id: string, @Res() res: Response): Promise<void> {
    const pedido = await this.pedidoService.obtenerPedidoPorId(Number(id));
    if (!pedido) {
      res.status(404).send({ message: 'Pedido no encontrado' });
      return;
    }
    await this.ticketService.generarTicket(pedido, res);
  }
}
