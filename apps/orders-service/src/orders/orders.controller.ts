import { Controller, Inject } from '@nestjs/common';
import { ClientProxy, MessagePattern } from '@nestjs/microservices';
import { MICROSERVICES_CLIENTS } from 'src/constant';

@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(MICROSERVICES_CLIENTS.REDIS_PRODUCT_SERVICE.name)
    private redisProductService: ClientProxy,
  ) {}

  @MessagePattern('create_order')
  createOrder(order: any) {
    console.log('Order Received in Orders Service', order);

    this.redisProductService.emit('order.created', order);
    return { message: 'Order Created', order };
  }
}
