import { Module } from '@nestjs/common';
import { MozosController } from './mozos.controller';

@Module({
  controllers: [MozosController],
})
export class MozosModule {}
