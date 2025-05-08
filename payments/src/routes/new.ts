import express, { Request, Response } from "express";
import { body } from "express-validator";
import {
  validateRequest,
  BadRequestError,
  NotAuthorizedError,
  NotFoundError,
  OrderStatus,
  requireAuth,
} from "@eftickets/common";
import { stripe } from "../stripe";
import { Order } from "../models/order";
import { Payment } from "../models/payment";
import { PaymentCreatedPublisher } from "../events/publishers/payment-created-publisher";
import { rabbitWrapper } from "../rabbit-wrapper";

const router = express.Router();

router.post(
  "/api/payments",
  requireAuth,
  [
    body("orderId").not().isEmpty(),
    body("title").not().isEmpty(),
    body("price").not().isEmpty(),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { orderId, title, price } = req.body;

    const order = await Order.findById(orderId);

    if (!order) {
      throw new NotFoundError();
    }
    if (order.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }
    if (order.status === OrderStatus.Cancelled) {
      throw new BadRequestError("Cannot pay for an cancelled order");
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: title,
            },
            unit_amount: Number(price) * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",

      success_url: "http://ticketslokal.com/payment/success",
      cancel_url: "http://ticketslokal.com/payment/cancel",
    });

    const payment = Payment.build({
      orderId,
      stripeId: session.id,
    });
    await payment.save();
    new PaymentCreatedPublisher(rabbitWrapper.client).publish({
      id: payment.id,
      orderId: payment.orderId,
      stripeId: payment.stripeId,
    });

    res.status(201).send({ url: session.url });
  }
);

export { router as createChargeRouter };
