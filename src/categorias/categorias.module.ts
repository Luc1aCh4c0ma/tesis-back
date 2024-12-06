import { Module } from '@nestjs/common';
import { Categoria } from './entities/categoria.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriasService } from './categorias.service';
import { Producto } from 'src/productos/entities/product.entity';
import { Menu } from './entities/menu.entity';
import { CategoriasController } from './categorias.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Categoria,Producto,Menu])],
  controllers: [CategoriasController],
  providers: [CategoriasService],
})
export class CategoriasModule {}
