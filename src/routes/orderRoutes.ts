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
 *   post:
 *     summary: Create a new order
 *     tags: [Order]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               couponId:
 *                 type: string
 *               products :
 *                 type: array
 *                 items:
 *                     type: object
 *                     properties:
 *                       productId:
 *                          type: string
 *                       price:
 *                          type: number
 *     responses:
 *       201:
 *         description: Order created successfully
 */
router.route("/")
    .get(OrderController.getAllOrders)
    .post(OrderController.createOrder)

/**
* @swagger
* /orders/{orderId}:
*   get:
*     summary: Get a order by ID
*     tags: [Order]
*     parameters:
*       - in: path
*         name: orderId
*         required: true
*         schema:
*           type: string
*     responses:
*       200:
*         description: Order retrieved successfully
*/
router.route("/:orderId")
    .get(OrderController.getOrdersById)

export default router;