import mongoose, { Document, Schema } from 'mongoose';
import { IBank } from './bankModel';
import { IUser } from './userModel';

// Định nghĩa interface cho một BankAccount Document
export interface IBankAccount extends Document {
    userId: IUser["_id"];
    bankId: IBank["_id"];
    accountNumber: string;
    ownerName: string;
    status: string;
}

// Định nghĩa schema cho BankAccount
const bankAccountSchema: Schema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    bankId: { type: Schema.Types.ObjectId, ref: 'Bank', required: true },
    accountNumber: { type: String, required: true },
    ownerName: { type: String, required: true },
    status: {
        type: String,
        enum: [
            "Active",
            "Inactive",
        ],
        default: "Active"
    },
}, {
    timestamps: true // Tự động thêm createdAt và updatedAt
});

// Tạo model BankAccount
export const BankAccount = mongoose.model<IBankAccount>('Bank Account', bankAccountSchema);
