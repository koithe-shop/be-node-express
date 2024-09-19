import mongoose, { Schema, Document } from 'mongoose';

export interface IFeedback extends Document {
    userId: mongoose.Types.ObjectId;
    categoryId: mongoose.Types.ObjectId;
    description: string;
    rating: number;
    date: Date;
}

const feedbackSchema: Schema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    description: { type: String },
    rating: { type: Number, required: true },
    date: { type: Date, default: Date.now }
});

export const Feedback = mongoose.model<IFeedback>('Feedback', feedbackSchema);
