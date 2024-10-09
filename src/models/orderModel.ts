import mongoose, { Document, Schema } from 'mongoose';
import { IUser } from './userModel';
import { IProduct } from './Product';
import { ICoupon } from './Coupon';

interface Product {
    productId: IProduct["_id"],
    price: IProduct["price"]
}

export interface IOrder extends Document {
    userId: IUser["_id"],
    couponId?: ICoupon["_id"],
    totalPrice: Number,
    status: Number,
    paymentStatus: Number,
    products: Product[]
}

const orderSchema: Schema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true
    },
    couponId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Coupon', // Reference to the Coupon model
        required: false
    },
    totalPrice: {
        type: Number,
        required: true
    },
    status: {
        type: Number,
        required: true,
        default: 0 // Set default status, e.g., 0 for 'pending'
    },
    paymentStatus: {
        type: Number,
        required: true,
        default: 0 // Set default payment status, e.g., 0 for 'unpaid'
    },
    products: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product', // Reference to the Product model
            required: true
        },
        price: {
            type: Number,
            required: true
        }
    }]
}, {
    timestamps: true // Tự động thêm createdAt và updatedAt
});

export const Order = mongoose.model<IOrder>('Order', orderSchema);
