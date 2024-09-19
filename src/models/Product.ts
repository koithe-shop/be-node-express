import mongoose, { Schema, Document } from 'mongoose';

interface ICertificates {
    origin: string;
    health_status: string;
    awards: string[];
}

export interface IProduct extends Document {
    productName: string;
    status: number;
    madeBy: string;
    gender: boolean;
    size: number;
    yob: number;
    character: string;
    certificates: ICertificates;
    screeningRate: number;
    foodOnDay: number;
    description: string;
    price: number;
    image: string[];
    categoryId: mongoose.Types.ObjectId;
    genotypeId: mongoose.Types.ObjectId;
}

const productSchema: Schema = new Schema({
    productName: { type: String, required: true },
    status: { type: Number, required: true },
    madeBy: { type: String, required: true },
    gender: { type: Boolean, required: true },
    size: { type: Number, required: true },
    yob: { type: Number, required: true },
    character: { type: String },
    certificates: {
        origin: { type: String },
        health_status: { type: String },
        awards: [{ type: String }]
    },
    screeningRate: { type: Number },
    foodOnDay: { type: Number },
    description: { type: String },
    price: { type: Number, required: true },
    image: [{ type: String }],
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    genotypeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Genotype' }
});

export const Product = mongoose.model<IProduct>('Product', productSchema);
