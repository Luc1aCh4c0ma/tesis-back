import { Controller, Get, Query } from '@nestjs/common';
import { ProductoService } from './productos.service';

@Controller('producto')
export class ProductoController {
  constructor(private readonly productosService: ProductoService) {}

  @Get()
  async obtenerProductos(@Query('categoriaId') categoriaId?: number) {
    return await this.productosService.obtenerProductos(categoriaId);
  }
}
