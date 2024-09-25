import { Request, Response } from 'express';
import { CouponService } from '../services/couponService';

export class CouponController {
    static async createCoupon(req: Request, res: Response) {
        try {
            const coupon = await CouponService.createCoupon(req.body);
            res.status(201).json(coupon);
        } catch (error) {
            const errorMessage = (error as Error).message;
            res.status(400).json({ message: errorMessage });
        }
    }

    static async getAllCoupons(req: Request, res: Response) {
        try {
            const coupons = await CouponService.getAllCoupons();
            res.status(200).json(coupons);
        } catch (error) {
            const errorMessage = (error as Error).message;
            res.status(500).json({ message: errorMessage });
        }
    }

    static async getCouponById(req: Request, res: Response) {
        try {
            const coupon = await CouponService.getCouponById(req.params.id);
            if (!coupon) {
                return res.status(404).json({ message: 'Coupon not found' });
            }
            res.status(200).json(coupon);
        } catch (error) {
            const errorMessage = (error as Error).message;
            res.status(500).json({ message: errorMessage });
        }
    }

    static async updateCoupon(req: Request, res: Response) {
        try {
            const coupon = await CouponService.updateCoupon(req.params.id, req.body);
            if (!coupon) {
                return res.status(404).json({ message: 'Coupon not found' });
            }
            res.status(200).json(coupon);
        } catch (error) {
            const errorMessage = (error as Error).message;
            res.status(400).json({ message: errorMessage });
        }
    }

    static async deleteCoupon(req: Request, res: Response) {
        try {
            const coupon = await CouponService.deleteCoupon(req.params.id);
            if (!coupon) {
                return res.status(404).json({ message: 'Coupon not found' });
            }
            res.status(200).json({ message: 'Coupon deleted successfully' });
        } catch (error) {
            const errorMessage = (error as Error).message;
            res.status(500).json({ message: errorMessage });
        }
    }
}
