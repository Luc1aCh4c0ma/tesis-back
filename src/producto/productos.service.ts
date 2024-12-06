import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Producto } from 'src/productos/entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductoService {
  constructor(
    @InjectRepository(Producto)
    private readonly productosRepository: Repository<Producto>,
  ) {}

  async obtenerProductos(categoriaId?: number): Promise<Producto[]> {
    if (categoriaId) {
      return this.productosRepository.find({
        where: { categoria: { id: categoriaId } },
        relations: ['categoria'],
      });
    }
    return this.productosRepository.find({ relations: ['categoria'] });
  }
  
}
