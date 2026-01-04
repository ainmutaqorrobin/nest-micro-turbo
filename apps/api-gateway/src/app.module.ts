import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MICROSERVICES_CLIENTS } from './constant';
import { OrdersController } from './orders/orders.controller';

const { ORDERS, PRODUCT, USERS } = MICROSERVICES_CLIENTS;

@Module({
  imports: [
    ClientsModule.register([
      {
        name: USERS.CLIENT_NAME,
        transport: Transport.TCP,
        options: { port: USERS.PORT },
      },
      {
        name: PRODUCT.CLIENT_NAME,
        transport: Transport.TCP,
        options: { port: PRODUCT.PORT },
      },
      {
        name: ORDERS.CLIENT_NAME,
        transport: Transport.TCP,
        options: { port: ORDERS.PORT },
      },
    ]),
  ],
  controllers: [AppController, OrdersController],
  providers: [AppService],
})
export class AppModule {}
