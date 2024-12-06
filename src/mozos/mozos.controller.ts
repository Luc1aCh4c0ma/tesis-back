import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';

interface Mozo {
  id: number;
  nombre: string;
  descripcion: string;
  imagen: string;
}

@Controller('mozos')
export class MozosController {
  private mozos: Mozo[] = [
    {
      id: 1,
      nombre: 'Cande',
      descripcion: 'Ama los cafés y las sonrisas.',
      imagen: '/uploads/cande.png',
    },
  ];

  @Get()
  getMozos(): Mozo[] {
    return this.mozos;
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('imagen', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueName = `${Date.now()}-${file.originalname}`;
          cb(null, uniqueName);
        },
      }),
    }),
  )
  createMozo(
    @Body() body: { nombre: string; descripcion: string },
    @UploadedFile() file: Express.Multer.File,
  ): Mozo {
    const newMozo: Mozo = {
      id: this.mozos.length + 1,
      nombre: body.nombre,
      descripcion: body.descripcion,
      imagen: `/uploads/${file.filename}`,
    };
    this.mozos.push(newMozo);
    return newMozo;
  }

  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('imagen', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueName = `${Date.now()}-${file.originalname}`;
          cb(null, uniqueName);
        },
      }),
    }),
  )
  editMozo(
    @Param('id') id: number,
    @Body() body: { nombre?: string; descripcion?: string },
    @UploadedFile() file?: Express.Multer.File,
  ): Mozo {
    const mozoIndex = this.mozos.findIndex((mozo) => mozo.id === Number(id));
    if (mozoIndex === -1) {
      throw new Error('Mozo no encontrado');
    }

    const updatedMozo = { ...this.mozos[mozoIndex], ...body };
    if (file) {
      updatedMozo.imagen = `/uploads/${file.filename}`;
    }
    this.mozos[mozoIndex] = updatedMozo;
    return updatedMozo;
  }

  @Delete(':id')
  deleteMozo(@Param('id') id: number): void {
    const mozoIndex = this.mozos.findIndex((mozo) => mozo.id === Number(id));
    if (mozoIndex === -1) {
      throw new Error('Mozo no encontrado');
    }
    this.mozos.splice(mozoIndex, 1);
  }
}
