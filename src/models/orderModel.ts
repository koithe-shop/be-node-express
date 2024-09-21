import mongoose, { Document, Schema } from 'mongoose';
import { IUser } from './userModel';

interface IProduct {
}

export interface IOrder extends Document {
    userId: IUser["_id"],
    date: Date,
    totalPrice: Number,
    status: Number,
    paymentStatus: Number,
}

const orderSchema: Schema = new Schema({

}, {
    timestamps: true // Tự động thêm createdAt và updatedAt
});

export const User = mongoose.model<IUser>('Order', orderSchema);
