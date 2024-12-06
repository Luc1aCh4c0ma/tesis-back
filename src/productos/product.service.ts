import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producto } from './entities/product.entity';
import { Categoria } from 'src/categorias/entities/categoria.entity';
import { CrearProductoDto } from './dto/create-product.dto';
import { ActualizarProductoDto } from './dto/update-product.dto';

export class ProductosService {
  constructor(
    
    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,
    

    @InjectRepository(Categoria)
    private readonly categoriaRepository: Repository<Categoria>,
  ) {}

  // **Crear un nuevo producto**
  async create(crearProductoDto: CrearProductoDto): Promise<Producto> {
    const { categoriaId } = crearProductoDto;

    // Verificar si la categoría existe
    const categoria = await this.categoriaRepository.findOneBy({ id: categoriaId });
    if (!categoria) {
      throw new NotFoundException(`Categoría con ID ${categoriaId} no encontrada`);
    }

    const nuevoProducto = this.productoRepository.create(crearProductoDto);
    return await this.productoRepository.save(nuevoProducto);
  }

  // **Obtener todos los productos**
  async findAll(): Promise<Producto[]> {
    return await this.productoRepository.find({
      relations: ['categoria'], // Incluye la relación con categoría
    });
  }    

  // **Obtener un producto por ID**
  async findOne(id: number): Promise<Producto> {
    const producto = await this.productoRepository.findOne({
      where: { id },
      relations: ['categoria'],
    });
  
    if (!producto) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }
  
    return producto;
  }
  

  // **Actualizar un producto**
  async actualizarProducto(id: number, datos: Partial<Producto>): Promise<Producto> {
    const producto = await this.productoRepository.findOne({ where: { id } });
  
    if (!producto) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }
  
    Object.assign(producto, datos); // Actualizamos los campos
    return this.productoRepository.save(producto);
  }
  

  // **Eliminar un producto**
  async remove(id: number): Promise<void> {
    const producto = await this.productoRepository.findOneBy({ id });

    if (!producto) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }

    await this.productoRepository.delete(id);
  }

  // **Actualizar la disponibilidad de un producto**
  async actualizarDisponibilidad(id: number, disponible: boolean): Promise<Producto> {
    const producto = await this.productoRepository.findOne({ where: { id } });
    if (!producto) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }
    producto.disponible = disponible;
    return this.productoRepository.save(producto); // Guarda los cambios y retorna el producto actualizado.
  }
  

  // **Obtener productos por categoría**
  async findCategoriaById(categoriaId: number): Promise<Producto[]> {
    const categoria = await this.categoriaRepository.findOneBy({ id: categoriaId });

    if (!categoria) {
      throw new NotFoundException(`Categoría con ID ${categoriaId} no encontrada`);
    }

    return await this.productoRepository.find({
      where: { categoriaId },
      relations: ['categoria'],
    });
  }

  async obtenerProductos(categoriaId?: number): Promise<Producto[]> {
    if (categoriaId) {
      return this.productoRepository.find({
        where: { categoria: { id: categoriaId } },
        relations: ['categoria'],
      });
    }
    return this.productoRepository.find({ relations: ['categoria'] });
  }
}
