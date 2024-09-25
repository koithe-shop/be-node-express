import { Coupon, ICoupon } from '../models/Coupon';

export class CouponService {
    static async createCoupon(data: Partial<ICoupon>) {
        // Validate required fields
        if (!data.couponName || !data.discountRate || !data.description || !data.validFrom || !data.validTo || !data.status) { // Add other required fields as necessary
            throw new Error('All fields must be filled.');
        }

        // Check for uniqueness of couponName
        const existingCoupon = await Coupon.findOne({ couponName: data.couponName });
        if (existingCoupon) {
            throw new Error('Coupon name must be unique.');
        }

        const coupon = new Coupon(data);
        return await coupon.save();
    }

    static async getAllCoupons() {
        return await Coupon.find();
    }

    static async getCouponById(id: string) {
        return await Coupon.findById(id);
    }

    static async updateCoupon(id: string, data: Partial<ICoupon>) {
        // Validate required fields
        if (!data.couponName || !data.discountRate || !data.description || !data.validFrom || !data.validTo || !data.status || !data.code)  { // Add other required fields as necessary
            throw new Error('All fields must be filled.');
        }

        // Check for uniqueness of couponName,code
        const existingCoupon = await Coupon.findOne({ couponName: data.couponName, _id: { $ne: id } });
        if (existingCoupon) {
            throw new Error('Coupon name must be unique.');
        }
        const existingCouponCode = await Coupon.findOne({ code: data.code, _id: { $ne: id } });
        if (existingCouponCode) {
            throw new Error('Code must be unique.');
        }

        return await Coupon.findByIdAndUpdate(id, data, { new: true });
    }

    static async deleteCoupon(id: string) {
        return await Coupon.findByIdAndDelete(id);
    }
}
