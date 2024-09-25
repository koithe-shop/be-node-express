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
