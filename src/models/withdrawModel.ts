import mongoose, { Document, Schema } from 'mongoose';

// Định nghĩa interface cho một Withdraw Document
export interface IWithdraw extends Document {
    bankAccountId: string;
    userId: string;
    consignmentSaleId: string;
    amount: number;
    status: string;
}

// Định nghĩa schema cho Withdraw
const withdrawSchema: Schema = new Schema({
    bankAccountId: { type: Schema.Types.ObjectId, ref: 'Bank Account', required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    consignmentSaleId: { type: Schema.Types.ObjectId, ref: 'ConsignmentSale', required: true },
    amount: { type: Number, required: true },
    status: {
        type: String,
        enum: [
            "Pending",
            "Completed",
            "Cancelleds"
        ],
        required: true,
        default: "Pending"
    },
});

// Tạo model Withdraw
export const Withdraw = mongoose.model<IWithdraw>('Withdraw', withdrawSchema);
