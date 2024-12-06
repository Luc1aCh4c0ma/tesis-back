import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { MesaService } from './mesa.service';
import { CreateMesaDto } from './dto/create_mesa.dto';
import { UpdateMesaDto } from './dto/update_mesa.dto';
import { Mesa } from './entities/mesas.entity';

@Controller('mesas')
export class MesaController {
  constructor(private readonly mesaService: MesaService) {}

  @Get()
  async findAll() {
    return await this.mesaService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.mesaService.findOne(id);
  }

  // Ruta para obtener todas las mesas disponibles
  @Get('disponible')
  async obtenerMesasDisponibles() {
    try {
      const mesas = await this.mesaService.obtenerMesasDisponibles();
      return mesas;
    } catch (error) {
      console.error('Error al obtener mesas disponibles:', error);
      throw new Error('Error al obtener mesas disponibles.');
    }
  }

  @Post()
  async create(@Body() createMesaDto: CreateMesaDto) {
    return await this.mesaService.create(createMesaDto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() UpdateMesaDto: Partial<Mesa>,
  ): Promise<Mesa> {
    return await this.mesaService.update(id, UpdateMesaDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    await this.mesaService.delete(id);
    return { message: 'Mesa eliminada con éxito' };
  }
}
