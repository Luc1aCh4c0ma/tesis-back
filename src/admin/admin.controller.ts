import { Controller, Get, UseGuards } from '@nestjs/common';
import { Roles } from '../decorators/roles.decorator';
import { RolesGuard } from '../guards/roles.guard';

@Controller('admin')
@UseGuards(RolesGuard)
export class AdminController {
  @Get('dashboard')
  @Roles('admin') // Solo accesible para usuarios con rol 'admin'
  getAdminDashboard() {
    return { message: 'Bienvenido al panel de administración' };
  }

  @Get('general')
  @Roles( 'user') // Accesible para ambos roles
  getGeneralInfo() {
    return { message: 'Información general' };
  }
}

