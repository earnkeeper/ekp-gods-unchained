import { OrderDto } from '../../api';
import { Order } from '../../db';

export class OrderMapper {
  static mapToOrder(orderDto: OrderDto): Order {
    return {
      amountSold: orderDto.amount_sold,
      buyTokenAddress: orderDto.buy?.data?.token_address,
      buyTokenDecimals: orderDto.buy?.data?.decimals,
      buyTokenQuantity: orderDto.buy?.data?.quantity,
      expirationTimestamp: orderDto.expiration_timestamp,
      id: orderDto.order_id,
      name: orderDto.sell?.data?.properties?.name,
      quantity: Number(orderDto.sell?.data?.quantity),
      timestamp: orderDto.timestamp,
      tokenId: orderDto.sell?.data?.token_id,
      updatedTimestamp: orderDto.updated_timestamp,
      user: orderDto.user,
    };
  }
}
