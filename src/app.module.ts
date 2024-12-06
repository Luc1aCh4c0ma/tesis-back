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
import * as config from './config';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'junction.proxy.rlwy.net', // Host de la base de datos
      port: 47158, // Puerto
      username: 'root', // Usuario
      password: 'ewCoerLXrkJmesqpqdfqlNMInrgHfRpI', // Contraseña
      database: 'railway', // Nombre de la base de datos
      autoLoadEntities: true,
      synchronize: true, // Solo para desarrollo. Desactívalo en producción.
      connectTimeout: 30000, // Tiempo de espera opcional (30 segundos)
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
