import express from 'express';
import { createPaymentIntent } from '../controllers/paymentController';

const router = express.Router();

/**
 * @swagger
 * /payments/create-payment-intent:
 *   post:
 *     summary: Create a PaymentIntent with Stripe
 *     tags: [Payments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: integer
 *                 example: 100000
 *     responses:
 *       200:
 *         description: Client secret for PaymentIntent
 */

router.post('/create-payment-intent', createPaymentIntent);

export default router;
