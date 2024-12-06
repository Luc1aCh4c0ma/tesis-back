import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Mesa } from './entities/mesas.entity';
import { CreateMesaDto } from './dto/create_mesa.dto';
import { UpdateMesaDto } from './dto/update_mesa.dto';

@Injectable()
export class MesaService {
  constructor(
    @InjectRepository(Mesa)
    private readonly mesaRepository: Repository<Mesa>,
  ) {}

  async findAll(): Promise<Mesa[]> {
    return await this.mesaRepository.find();
  }

  async findOne(id: number): Promise<Mesa> {
    const mesa = await this.mesaRepository.findOne({ where: { id } });
    if (!mesa) throw new NotFoundException(`Mesa con ID ${id} no encontrada`);
    return mesa;
  }

  // Método para obtener todas las mesas disponibles
  async obtenerMesasDisponibles(): Promise<Mesa[]> {
    try {
      return await this.mesaRepository.find({ where: { isAvailable: true } });
    } catch (error) {
      console.error('Error al obtener mesas disponibles:', error);
      throw new Error('Error al obtener mesas disponibles.');
    }
  }
  

  async create(createMesaDto: CreateMesaDto): Promise<Mesa> {
    const nuevaMesa = this.mesaRepository.create(createMesaDto);
    return await this.mesaRepository.save(nuevaMesa);
  }

  async update(id: number, updateMesaDto: UpdateMesaDto): Promise<Mesa> {
    const mesa = await this.findOne(id);
    Object.assign(mesa, updateMesaDto);
    return await this.mesaRepository.save(mesa);
  }

  async delete(id: number): Promise<void> {
    const result = await this.mesaRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Mesa con ID ${id} no encontrada`);
    }
  }
}
