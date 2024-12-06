import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MesaService } from '../mesas/mesa.service'; // Asegúrate de que el path sea correcto
import { CreateClienteDto } from './dto/create-cliente.dto';
import { Cliente } from './entities/cliente.entity';

@Injectable()
export class ClientesService {
  constructor(
    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,
    private readonly mesaService: MesaService, // Dependencia de MesaService
  ) {}

  // Obtener todos los clientes
  async obtenerClientes(): Promise<Cliente[]> {
    return this.clienteRepository.find();
  }

  // Registrar un nuevo cliente
  async registrarCliente(datosCliente: CreateClienteDto): Promise<Cliente> {
    const mesa = datosCliente.mesaId
      ? await this.mesaService.findOne(datosCliente.mesaId)
      : null;
  
    const nuevoCliente = this.clienteRepository.create({
      ...datosCliente,
      mesa: mesa ? `Mesa ${mesa.numero}` : 'Sin mesa',
    });
  
    return this.clienteRepository.save(nuevoCliente);
  }
  
}
