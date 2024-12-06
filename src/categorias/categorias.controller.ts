import { Controller, Post, Get, Param, Body, NotFoundException } from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { CrearCategoriaDto } from './dto/crear-categoria.dto';

@Controller('categorias')
export class CategoriasController {
  constructor(private readonly categoriasService: CategoriasService) {}

  // **Crear una nueva categoría**
  @Post()
  async create(@Body() crearCategoriaDto: CrearCategoriaDto) {
    return await this.categoriasService.create(crearCategoriaDto);
  }

  // **Obtener todas las categorías**
  @Get()
  async findAll() {
    return await this.categoriasService.findAll();
  }

  // **Obtener una categoría por ID**
  @Get(':id')
  async findOne(@Param('id') id: number) {
    const categoria = await this.categoriasService.findOne(id);
    if (!categoria) {
      throw new NotFoundException(`Categoría con ID ${id} no encontrada`);
    }
    return categoria;
  }
}
