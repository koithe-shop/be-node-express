import { Router } from 'express';
import { CouponController } from '../controllers/couponController';

const router = Router();

// Create a new coupon
router.post('/', CouponController.createCoupon);

// Get all coupons
router.get('/', CouponController.getAllCoupons);

// Get a coupon by ID
router.get('/:id', CouponController.getCouponById);

// Update a coupon by ID
router.put('/:id', CouponController.updateCoupon);

// Delete a coupon by ID
router.delete('/:id', CouponController.deleteCoupon);

export default router;
/**
 * @swagger
 * components:
 *   schemas:
 *     Coupon:
 *       type: object
 *       required:
 *         - couponName
 *         - code
 *         - status
 *       properties:
 *         couponName:
 *           type: string
 *           description: The name of the coupon
 *         code:
 *           type: string
 *           description: The unique coupon code
 *         validFrom:
 *           type: string
 *           format: date-time
 *           description: The starting validity date
 *         validTo:
 *           type: string
 *           format: date-time
 *           description: The ending validity date
 *         discountRate:
 *           type: number
 *           description: The percentage discount
 *         status:
 *           type: integer
 *           description: The status of the coupon (1 for active, 0 for inactive)
 *         description:
 *           type: string
 *           description: The description of the coupon
 */

/**
 * @swagger
 * /coupons:
 *   post:
 *     summary: Create a new coupon
 *     tags: [Coupons]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Coupon'
 *     responses:
 *       201:
 *         description: The coupon was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Coupon'
 *       400:
 *         description: Bad request
 */
/**
 * @swagger
 * /coupons:
 *   get:
 *     summary: Get all coupons
 *     tags: [Coupons]
 *     responses:
 *       200:
 *         description: List of all coupons
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Coupon'
 */
/**
 * @swagger
 * /coupons/{id}:
 *   get:
 *     summary: Get a coupon by ID
 *     tags: [Coupons]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The coupon ID
 *     responses:
 *       200:
 *         description: The coupon description by ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Coupon'
 *       404:
 *         description: Coupon not found
 */
/**
 * @swagger
 * /coupons/{id}:
 *   put:
 *     summary: Update a coupon by ID
 *     tags: [Coupons]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The coupon ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Coupon'
 *     responses:
 *       200:
 *         description: The updated coupon
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Coupon'
 *       404:
 *         description: Coupon not found
 *       400:
 *         description: Bad request
 */
/**
 * @swagger
 * /coupons/{id}:
 *   delete:
 *     summary: Delete a coupon by ID
 *     tags: [Coupons]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The coupon ID
 *     responses:
 *       200:
 *         description: The coupon was deleted successfully
 *       404:
 *         description: Coupon not found
 */