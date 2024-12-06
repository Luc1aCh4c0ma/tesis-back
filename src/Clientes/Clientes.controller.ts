import { Controller, Post, Body, Get, Param, Patch } from '@nestjs/common';
import { ClientesService } from './clientes.service';

import { Cliente } from './entities/cliente.entity';
import { MesaService } from 'src/mesas/mesa.service';
import { CreateClienteDto } from './dto/create-cliente.dto';

@Controller('clientes')
export class ClientesController {
  constructor(
    private readonly clientesService: ClientesService,
    private readonly mesaService: MesaService, // Inyección del servicio de mesas
  ) {}

  @Get()
  async obtenerClientes(): Promise<Cliente[]> {
    return this.clientesService.obtenerClientes();
  }

  @Get('mesas-disponibles')
  async obtenerMesasDisponibles() {
    return this.mesaService.obtenerMesasDisponibles();
  }

  @Post()
async registrarCliente(@Body() datosCliente: CreateClienteDto): Promise<Cliente> {
  // El código actual ya valida si la mesa está disponible o no
  const mesa = datosCliente.mesaId
    ? await this.mesaService.findOne(datosCliente.mesaId)
    : null;

  if (mesa && !mesa.isAvailable) {
    throw new Error('La mesa seleccionada no está disponible.');
  }

  // Registrar cliente y deshabilitar la mesa si aplica
  const cliente = await this.clientesService.registrarCliente(datosCliente);

  if (mesa) {
    await this.mesaService.update(datosCliente.mesaId, { isAvailable: false });
  }

  return cliente;
}

}
