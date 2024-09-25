import { Genotype, IGenotype } from '../models/Genotype';

export class GenotypeService {
    static async createGenotype(data: Partial<IGenotype>) {
        // Kiểm tra genotype đã tồn tại chưa
        const existingGenotype = await Genotype.findOne({ genotypeName: data.genotypeName });
        if (existingGenotype) {
            throw new Error('Genotype with this name already exists');
        }

        const genotype = new Genotype(data);
        return await genotype.save();
    }
    static async getAllGenotypes() {
        return await Genotype.find();
    }

    static async getGenotypeById(id: string) {
        return await Genotype.findById(id);
    }

    static async updateGenotype(id: string, data: Partial<IGenotype>) {
        // Kiểm tra genotype có tồn tại không
        const existingGenotype = await Genotype.findById(id);
        if (!existingGenotype) {
            throw new Error('Genotype not found');
        }

        // Nếu tên genotype thay đổi, kiểm tra xem tên mới đã tồn tại chưa
        if (data.genotypeName && data.genotypeName !== existingGenotype.genotypeName) {
            const genotypeWithSameName = await Genotype.findOne({ genotypeName: data.genotypeName });
            if (genotypeWithSameName) {
                throw new Error('Genotype with this name already exists');
            }
        }

        return await Genotype.findByIdAndUpdate(id, data, { new: true });
    }

    static async deleteGenotype(id: string) {
        return await Genotype.findByIdAndDelete(id);
    }
}
