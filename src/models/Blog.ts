import mongoose, { Schema, Document } from 'mongoose';

export interface IBlog extends Document {
    title: string;
    content: string;
    category: string;
    tags: string[];
    author: string;
}

const blogSchema: Schema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String, required: true },
    tags: [{ type: String }],
    author: { type: String, required: true }
});

export const Blog = mongoose.model<IBlog>('Blog', blogSchema);
