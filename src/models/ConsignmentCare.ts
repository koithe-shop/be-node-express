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
}

const consignmentCareSchema: Schema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Tham chiếu tới User
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true }, // Tham chiếu tới Product
    careType: { type: String, required: true }, // Loại hình chăm sóc
    startDate: { type: Date, required: true }, // Ngày bắt đầu chăm sóc
    endDate: { type: Date, required: true }, // Ngày kết thúc chăm sóc
    totalPrice: { type: Number, required: true }, // Tổng giá tiền
    pricePerDay: { type: Number, required: true }, // Giá mỗi ngày
    status: { type: String, required: true }, // Trạng thái chăm sóc
}, {
    timestamps: true // Tự động thêm createdAt và updatedAt
});

export const ConsignmentCare = mongoose.model<IConsignmentCare>('ConsignmentCare', consignmentCareSchema);
