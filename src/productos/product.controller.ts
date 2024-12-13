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
  ParseIntPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

import { CrearProductoDto } from './dto/create-product.dto';
import { ProductosService } from './product.service';
import { ActualizarProductoDto } from './dto/update-product.dto';

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

    const imagePath = file ? `https://tesis-back-production-8e0c.up.railway.app/uploads/${file.filename}` : null;
    return this.productosService.create({ ...crearProductoDto, imagen: imagePath });
  }

  @Put(':id')
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
  async actualizarProducto(
    @Param('id', ParseIntPipe) id: number,
    @Body() datos: ActualizarProductoDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    // Verificar si el producto existe
    const producto = await this.productosService.findOne(id);
    if (!producto) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }

    // Actualizar la ruta de la imagen si se proporciona un archivo
    const updatedData = { ...datos };
    if (file) {
      updatedData.imagen = `https://tesis-back-production-8e0c.up.railway.app/uploads/${file.filename}`;
    }

    return this.productosService.actualizarProducto(id, updatedData);
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
