import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt'; // Importa JwtModule
import { MesaModule } from './mesas/mesa.module';
import { ProductModule } from './productos/product.module';
import { SupplierOrderModule } from './SupplierOrder/SupplierOrder.module';
import { CategoriasModule } from './categorias/categorias.module';
import { ClienteModule } from './Clientes/Clientes.module';
import { MozosModule } from './mozos/mozos.module';
import { PedidosModule } from './pedido/pedido.module';
import { TicketModule } from './ticket/ticket.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port:+ process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true, // ⚠️ Usa solo en desarrollo
    }),
    AuthModule,
    MesaModule,
    ProductModule,
    SupplierOrderModule,
    CategoriasModule,
    ClienteModule,
    MozosModule,
    PedidosModule,
    TicketModule,
    JwtModule.register({
      secret: 'your-secret-key', // Utiliza una clave secreta segura
      signOptions: { expiresIn: '60m' }, // Ajusta según lo que necesites
    }),
  ],
})
export class AppModule {}
