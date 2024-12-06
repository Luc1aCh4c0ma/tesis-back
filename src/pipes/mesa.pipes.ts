import { BadRequestException, PipeTransform, Injectable } from '@nestjs/common';

@Injectable()
export class CustomParseIntPipe implements PipeTransform {
  transform(value: string) {
    const val = parseInt(value, 10);
    if (isNaN(val)) {
      throw new BadRequestException('El ID debe ser un número válido');
    }
    return val;
  }
}
