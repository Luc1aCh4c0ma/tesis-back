import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Patch,
  Param,
  Body,
  Query,
  UploadedFile,
  UseInterceptors,
  NotFoundException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

import { CrearProductoDto } from './dto/create-product.dto';
import { ProductosService } from './product.service';

@Controller('productos')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}

  

  @Post()
  @UseInterceptors(
    FileInterceptor('imagen', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          callback(null, `${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async create(
    @Body() crearProductoDto: CrearProductoDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    // Verificar que la categoría existe
    const categoria = await this.productosService.findCategoriaById(crearProductoDto.categoriaId);
    if (!categoria) {
      throw new NotFoundException(`Categoría con ID ${crearProductoDto.categoriaId} no encontrada`);
    }

    const imagePath = file ? `http://localhost:3000/uploads/${file.filename}` : null;
    return this.productosService.create({ ...crearProductoDto, imagen: imagePath });
  }

  @Get()
  async obtenerProductos(@Query('categoriaId') categoriaId?: number) {
    return await this.productosService.obtenerProductos(categoriaId);
  }
  
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.productosService.findOne(Number(id));
  }

  

  @Patch(':id/disponibilidad')
async actualizarDisponibilidad(
  @Param('id') id: number,
  @Body('disponible') disponible: boolean,
) {
  const producto = await this.productosService.actualizarDisponibilidad(id, disponible);
  if (!producto) {
    throw new NotFoundException(`Producto con ID ${id} no encontrado`);
  }
  return producto; // Asegúrate de retornar el producto actualizado.
}



  @Delete(':id')
async eliminarProducto(@Param('id') id: number) {
  await this.productosService.remove(id);
  return { message: 'Producto eliminado correctamente' };
}

}
