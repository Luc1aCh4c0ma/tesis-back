import { Controller, Post, Body, Get, Param, Patch, Put, Query } from '@nestjs/common';
import { PedidosService } from './pedido.service';
import { Pedido } from './entities/pedido.entity';

@Controller('pedidos')
export class PedidosController {
  constructor(private readonly pedidosService: PedidosService) {}

  @Post()
async crearPedido(@Body() pedidoData: Partial<Pedido>): Promise<Pedido> {
  try {
    return await this.pedidosService.crearPedido(pedidoData);
  } catch (error) {
    console.error('Error al crear el pedido:', error);
    throw new Error('Error al crear el pedido');
  }
}


  @Get()
  async obtenerPedidos(): Promise<Pedido[]> {
    return this.pedidosService.obtenerPedidos();
  }

  @Get(':estado')
async obtenerPedidosPorEstado(@Param('estado') estado: string): Promise<Pedido[]> {
  return this.pedidosService.obtenerPedidos(estado);
}


  @Get('detalle/:id')
  async obtenerPedidoPorId(@Param('id') id: number): Promise<Pedido> {
    try {
      return await this.pedidosService.obtenerPedidoPorId(id);
    } catch (error) {
      console.error('Error al obtener detalles del pedido:', error);
      throw new Error('Error interno del servidor');
    }
  }
  
  @Put(':id/entregado')
  async marcarComoEntregado(@Param('id') id: number): Promise<Pedido> {
    try {
      return await this.pedidosService.actualizarEstado(id, 'entregado');
    } catch (error) {
      console.error('Error al marcar el pedido como entregado:', error);
      throw new Error('Error al marcar como entregado');
    }
  }


  @Patch(':id')
  async actualizarEstado(@Param('id') id: number, @Body('estado') estado: string): Promise<Pedido> {
    return this.pedidosService.actualizarEstado(id, estado);
  }


}
