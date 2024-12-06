import { Module } from '@nestjs/common';
import { ProductModule } from 'src/productos/product.module';
import { ProductoService } from './productos.service';
import { ProductoController } from './productos.controller';


@Module({
  imports: [ProductModule], // Importa el módulo de productos
  providers: [ProductoService],
  controllers: [ProductoController],
})
export class ProductoModule {}
