import {
  ExchangeNames,
  Consumer,
  PaymentCreatedEvent,
  OrderStatus,
} from "@eftickets/common";

import { Order } from "../../models/order";

export class PaymentCreatedListener extends Consumer<PaymentCreatedEvent> {
  readonly exchangeName = ExchangeNames.PaymentCreated;
  routingKey = "paymentKeyCreate";
  exchangeType = "direct";
  queueName = "paymentQueueCreate";

  async onMessage(data: PaymentCreatedEvent["data"]) {
    const order = await Order.findById(data.orderId);

    if (!order) {
      throw new Error("Order not found");
    }

    order.set({
      status: OrderStatus.Complete,
    });
    await order.save();

    // msg.ack();
  }
}
