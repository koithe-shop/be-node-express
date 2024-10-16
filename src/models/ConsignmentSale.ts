import mongoose, { Document, Schema } from 'mongoose';
import { IUser } from './userModel';
import { IProduct } from './Product';

export interface IConsignmentSale extends Document {
    userId: IUser["_id"],
    productId: IProduct["_id"],
    saleType: string,
    priceAgreed: number,
    inspectionStatus: string,
    status: string,
    paymentStatus: string,
}

const consignmentSaleSchema: Schema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // Reference to the Coupon model
        required: true
    },
    saleType: {
        type: String,
        enum: [
            "Offline",
            "Online"
        ],
        required: true,
        default: "Offline"
    },
    priceAgreed: {
        type: Number,
        required: true
    },
    inspectionStatus: {
        type: String,
        enum: [
            "Pending",
            "Passed",
            "Failed"
        ],
        required: true,
        default: "Pending"
    },
    status: {
        type: String,
        enum: [
            "Pending",
            "Active",
            "Sold",
            "Cancelled"
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
}, {
    timestamps: true // Tự động thêm createdAt và updatedAt
});

export const ConsignmentSale = mongoose.model<IConsignmentSale>('ConsignmentSale', consignmentSaleSchema);
