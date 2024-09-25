import { Router } from 'express';
import * as OrderController from '../controllers/orderController';
import { authenticateJWT, isManager } from '../middlewares/authMiddleware';

const router = Router();

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Get all orders
 *     tags: [Order]
 *     responses:
 *       200:
 *         description: Get orders list successfully
 */
router.route("/")
    .get(OrderController.getAllOrders)

export default router;