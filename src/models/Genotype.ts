import mongoose, { Schema, Document } from 'mongoose';

export interface IGenotype extends Document {
    genotypeName: string;
}

const genotypeSchema: Schema = new Schema({
    genotypeName: { type: String, required: true }
});

export const Genotype = mongoose.model<IGenotype>('Genotype', genotypeSchema);
