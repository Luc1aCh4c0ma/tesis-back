import { Controller, Get, UseGuards } from '@nestjs/common';
import { RolesGuard } from 'src/guards/roles.guard';

@Controller('dashboard')
export class DashboardController {
  @UseGuards(RolesGuard)
  @Get()
  getDashboard() {
    return 'Dashboard content';
  }
}
