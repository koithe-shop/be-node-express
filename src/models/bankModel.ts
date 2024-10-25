import mongoose, { Document, Schema } from 'mongoose';

// Định nghĩa interface cho một Bank Document
export interface IBank extends Document {
    name: string;
    code: string;
    shortName: string;
    logo: string;
}

// Định nghĩa schema cho Bank
const bankSchema: Schema = new Schema({
    name: { type: String, required: true },
    code: { type: String, required: true },
    shortName: { type: String, required: true },
    logo: { type: String, required: true },
});

// Tạo model Bank
export const Bank = mongoose.model<IBank>('Bank', bankSchema);
