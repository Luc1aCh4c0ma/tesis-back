import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, MoreThanOrEqual, Repository } from 'typeorm';
import { Pedido } from './entities/pedido.entity';
import { ItemPedido } from './entities/item.entity';

@Injectable()
export class PedidosService {
  constructor(
    @InjectRepository(Pedido)
    private readonly pedidosRepository: Repository<Pedido>,
  ) {}

  // PedidoService
  async crearPedido(pedidoData: Partial<Pedido>): Promise<Pedido> {
    const { items, ...pedidoSinItems } = pedidoData;
  
    const nuevoPedido = this.pedidosRepository.create(pedidoSinItems);
    if (items && items.length > 0) {
      nuevoPedido.items = items.map((item) => {
        return this.pedidosRepository.manager.create(ItemPedido, item);
      });
    }
  
    try {
      console.log('Pedido a guardar:', nuevoPedido);
      return await this.pedidosRepository.save(nuevoPedido);
    } catch (error) {
      console.error('Error al guardar el pedido:', error);
      throw new Error('Error al crear el pedido');
    }
  }
  
  
  
  

  async obtenerPedidos(estado?: string): Promise<Pedido[]> {
    return this.pedidosRepository.find({
      where: estado ? { estado } : {},
      relations: ['items'], // Incluye los items relacionados
    });
  }
  
  async obtenerPedidoPorId(id: number): Promise<Pedido> {
    try {
      const pedido = await this.pedidosRepository.findOne({
        where: { id },
        relations: ['items'],  // Asegúrate de incluir la relación 'items'
      });
      if (!pedido) {
        throw new Error('Pedido no encontrado');
      }
      return pedido;
    } catch (error) {
      console.error('Error al obtener el pedido:', error);
      throw new Error('Error interno del servidor');
    }
  }
  
  


  async actualizarEstado(id: number, estado: string): Promise<Pedido> {
    const pedido = await this.pedidosRepository.findOneBy({ id });
    if (!pedido) {
      throw new Error('Pedido no encontrado');
    }
    pedido.estado = estado;
    return this.pedidosRepository.save(pedido);
  }


  
  
  
}
