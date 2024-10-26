import mongoose, { Document, Schema } from 'mongoose';
import { IUser } from './userModel';
import { IProduct } from './Product';

export interface IConsignmentCare extends Document {
    userId: IUser["_id"],
    productId: IProduct["_id"],
    careType: string,
    startDate: Date,
    endDate: Date,
    totalPrice: number,
    pricePerDay: number,
    status: string,
    paymentStatus: string
}

const consignmentCareSchema: Schema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Tham chiếu tới User
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true }, // Tham chiếu tới Product
    careType: {
        type: String,
        enum: [
            "Normal",
            "Special",
        ],
        required: true,
        default: "Normal",
    },
    startDate: { type: Date, required: true }, // Ngày bắt đầu chăm sóc
    endDate: { type: Date, required: true }, // Ngày kết thúc chăm sóc
    totalPrice: { type: Number, required: true }, // Tổng giá tiền
    pricePerDay: {
        type: Number,
        enum: [
            100000,
            150000
        ],
        required: true,
        default: 150000,
    },
    status: {
        type: String,
        enum: [
            "Care",
            "Returned",
        ],
        required: true,
        default: "Care"
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
}, {
    timestamps: true // Tự động thêm createdAt và updatedAt
});

export const ConsignmentCare = mongoose.model<IConsignmentCare>('ConsignmentCare', consignmentCareSchema);
