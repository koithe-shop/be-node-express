import mongoose, { Schema, Document } from 'mongoose';

export interface ICategory extends Document {
    categoryName: string;
    description: string;
    image: string[];
}

const categorySchema: Schema = new Schema({
    categoryName: { type: String, required: true },
    description: { type: String },
    image: [{ type: String }],
});

export const Category = mongoose.model<ICategory>('Category', categorySchema);
