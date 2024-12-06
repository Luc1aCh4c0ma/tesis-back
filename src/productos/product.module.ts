import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductosService} from './product.service';
import { ProductosController } from './product.controller';
import {  Producto } from './entities/product.entity';
import { Categoria } from 'src/categorias/entities/categoria.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Producto, Categoria])],
  providers: [ProductosService],
  controllers: [ProductosController],
  exports: [ProductosService], // Exporta el servicio para usarlo en otros módulos

})
export class ProductModule {}
