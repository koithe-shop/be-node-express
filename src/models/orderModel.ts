import mongoose, { Document, Schema } from 'mongoose';
import { IUser } from './userModel';
import { IProduct } from './Product';

export interface IOrder extends Document {
    userId: IUser["_id"],
    staffId?: IUser["_id"],
    totalPrice: number,
    status: string,
    paymentStatus: string,
    products: IProduct["_id"][] // Chỉ lưu ID sản phẩm
    address: string
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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    }],
    address: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

export const Order = mongoose.model<IOrder>('Order', orderSchema);
