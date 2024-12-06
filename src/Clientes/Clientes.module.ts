import { Module } from '@nestjs/common';
import { ClientesService } from './Clientes.service';
import { ClientesController } from './Clientes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from './entities/Cliente.entity';
import { MesaModule } from '../mesas/mesa.module'; // Importa MesaModule

@Module({
  imports: [
    TypeOrmModule.forFeature([Cliente]), // Conecta con la entidad Cliente
    MesaModule, // Importa MesaModule para usar MesaService
  ],
  controllers: [ClientesController],
  providers: [ClientesService],
  exports: [ClientesService], // Exporta ClientesService si es necesario en otros módulos
})
export class ClienteModule {}
