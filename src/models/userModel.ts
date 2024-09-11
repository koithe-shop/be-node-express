import mongoose, { Document, Schema } from 'mongoose';
import { IRole } from './roleModel';

// Định nghĩa interface cho một User Document
export interface IUser extends Document {
    fullName: string;
    username: string;
    password: string;
    phoneNumber: string;
    address: string;
    roldId: IRole["_id"] // Kiểu dữ liệu là ObjectId tham chiếu đến Role
}

// Định nghĩa schema cho User
const userSchema: Schema = new Schema({
    fullName: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    address: { type: String, required: true },
    roleId: { type: Schema.Types.ObjectId, ref: 'Role', required: true }, // Tham chiếu đến Role
}, {
    timestamps: true // Tự động thêm createdAt và updatedAt
});

// Tạo model User
export const User = mongoose.model<IUser>('User', userSchema);
