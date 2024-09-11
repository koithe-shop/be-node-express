import mongoose, { Schema, Document } from 'mongoose';

// Định nghĩa interface cho Role
export interface IRole extends Document {
    roleName: string;
}

// Định nghĩa schema cho Role
const roleSchema: Schema = new Schema({
    roleName: { type: String, required: true }
});

// Tạo model cho Role
export const Role = mongoose.model<IRole>('Role', roleSchema);
