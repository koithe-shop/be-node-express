import mongoose, { Schema, Document } from 'mongoose';

export interface ICoupon extends Document {
    couponName: string;
    code: string;
    validFrom: Date;
    validTo: Date;
    discountRate: number;
    status: number;
    description: string;
}

const couponSchema: Schema = new Schema({
    couponName: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    validFrom: { type: Date },
    validTo: { type: Date },
    discountRate: { type: Number, min: 1, max: 100 },
    status: { type: Number, required: true },
    description: { type: String }
});

export const Coupon = mongoose.model<ICoupon>('Coupon', couponSchema);
