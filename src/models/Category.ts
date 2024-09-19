import mongoose, { Schema, Document } from 'mongoose';

export interface ICategory extends Document {
    categoryName: string;
    description: string;
}

const categorySchema: Schema = new Schema({
    categoryName: { type: String, required: true },
    description: { type: String }
});

export const Category = mongoose.model<ICategory>('Category', categorySchema);
