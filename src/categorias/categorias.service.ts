import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categoria } from './entities/categoria.entity';
import { CrearCategoriaDto } from './dto/crear-categoria.dto';

@Injectable()
export class CategoriasService {
  constructor(
    @InjectRepository(Categoria)
    private readonly categoriaRepository: Repository<Categoria>,
  ) {}

  // **Crear una nueva categoría**
  async create(crearCategoriaDto: CrearCategoriaDto): Promise<Categoria> {
    const nuevaCategoria = this.categoriaRepository.create(crearCategoriaDto);
    return await this.categoriaRepository.save(nuevaCategoria);
  }

  // **Obtener todas las categorías**
  async findAll(): Promise<Categoria[]> {
    return await this.categoriaRepository.find();
  }

  // **Obtener una categoría por ID**
  async findOne(id: number): Promise<Categoria> {
    const categoria = await this.categoriaRepository.findOneBy({ id });
    if (!categoria) {
      throw new NotFoundException(`Categoría con ID ${id} no encontrada`);
    }
    return categoria;
  }
}
