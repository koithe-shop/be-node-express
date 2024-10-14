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
    staffId?: IUser["_id"],
    couponId?: ICoupon["_id"],
    totalPrice: Number,
    status: string,
    paymentStatus: string,
    products: Product[]
}

const orderSchema: Schema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    staffId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false
    },
    couponId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Coupon',
        required: false
    },
    totalPrice: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: [
            "Pending",
            "Completed",
            "Cancelled",
            "Deny"
        ],
        required: true,
        default: "Pending"
    },
    paymentStatus: {
        type: String,
        enum: [
            "Pending",
            "Success",
            "Cancelled",
        ],
        required: true,
        default: "Pending"
    },
    products: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        price: {
            type: Number,
            required: true
        }
    }]
}, {
    timestamps: true
});

export const Order = mongoose.model<IOrder>('Order', orderSchema);
