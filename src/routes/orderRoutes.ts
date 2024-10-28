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
 *               staffId:
 *                 type: string
 *               products:
 *                 type: array
 *                 items:
 *                   type: string
 *               totalPrice:
 *                 type: integer
 *               address:
 *                 type: string
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

/**
* @swagger
* /orders/change-payment-status/{orderId}:
*   put:
*     summary: Change payment status order by ID
*     tags: [Order]
*     parameters:
*       - in: path
*         name: orderId
*         required: true
*         schema:
*           type: string
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               paymentStatus:
*                 type: string
*     responses:
*       200:
*         description: Change payment status order by ID successfully
*/
router.route("/change-payment-status/:orderId")
    .put(OrderController.changePaymentStatus)

export default router;