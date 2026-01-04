import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrdersController } from './orders/orders.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MICROSERVICES_CLIENTS } from './constant';

const { REDIS_PRODUCT_SERVICE } = MICROSERVICES_CLIENTS;
@Module({
  imports: [
    ClientsModule.register([
      {
        name: REDIS_PRODUCT_SERVICE.name,
        transport: Transport.REDIS,
        options: { host: 'localhost', port: REDIS_PRODUCT_SERVICE.port },
      },
    ]),
  ],
  controllers: [AppController, OrdersController],
  providers: [AppService],
})
export class AppModule {}
