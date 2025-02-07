import express, { Request, Response } from "express";
import { requireAuth } from "@eftickets/common";
import { Order } from "../models/order";
import { Ticket } from "../models/ticket"; //for testing to be removed

const router = express.Router();

router.get("/api/orders", requireAuth, async (req: Request, res: Response) => {
  const orders = await Order.find({
    userId: req.currentUser!.id,
  }).populate("ticket");

  res.send(orders);
});

//testing
router.get(
  "/api/orders/tickets",
  requireAuth,
  async (req: Request, res: Response) => {
    const tickets = await Ticket.find({});

    res.send(tickets);
  }
);

export { router as indexOrderRouter };
