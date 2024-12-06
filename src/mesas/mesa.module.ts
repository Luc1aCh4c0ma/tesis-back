import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MesaService } from './mesa.service';
import { MesaController } from './mesa.controller';
import { Mesa } from './entities/mesas.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Mesa])],
  controllers: [MesaController],
  providers: [MesaService],
  exports: [MesaService], // Exporta MesaService para que otros módulos puedan usarlo

})
export class MesaModule {}
