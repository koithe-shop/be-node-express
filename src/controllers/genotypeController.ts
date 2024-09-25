import { Request, Response } from 'express';
import { GenotypeService } from '../services/genotypeService';

export class GenotypeController {
    static async createGenotype(req: Request, res: Response) {
        try {
            const { genotypeName } = req.body;

            // Kiểm tra trường bắt buộc
            if (!genotypeName) {
                return res.status(400).json({ message: 'Genotype name is required' });
            }

            // Tạo genotype
            const genotype = await GenotypeService.createGenotype(req.body);
            res.status(201).json(genotype);
        } catch (error) {
            const errorMessage = (error as Error).message;
            res.status(400).json({ message: errorMessage });
        }
    }

    static async getAllGenotypes(req: Request, res: Response) {
        try {
            const genotypes = await GenotypeService.getAllGenotypes();
            res.status(200).json(genotypes);
        } catch (error) {
            const errorMessage = (error as Error).message;
            res.status(500).json({ message: errorMessage });
        }
    }

    static async getGenotypeById(req: Request, res: Response) {
        try {
            const genotype = await GenotypeService.getGenotypeById(req.params.id);
            if (!genotype) {
                return res.status(404).json({ message: 'Genotype not found' });
            }
            res.status(200).json(genotype);
        } catch (error) {
            const errorMessage = (error as Error).message;
            res.status(500).json({ message: errorMessage });
        }
    }

    static async updateGenotype(req: Request, res: Response) {
        try {
            const { genotypeName } = req.body;

            // Kiểm tra trường bắt buộc
            if (!genotypeName) {
                return res.status(400).json({ message: 'Genotype name is required' });
            }

            // Cập nhật genotype
            const genotype = await GenotypeService.updateGenotype(req.params.id, req.body);
            if (!genotype) {
                return res.status(404).json({ message: 'Genotype not found' });
            }

            res.status(200).json(genotype);
        } catch (error) {
            const errorMessage = (error as Error).message;
            res.status(400).json({ message: errorMessage });
        }
    }

    static async deleteGenotype(req: Request, res: Response) {
        try {
            const genotype = await GenotypeService.deleteGenotype(req.params.id);
            if (!genotype) {
                return res.status(404).json({ message: 'Genotype not found' });
            }
            res.status(200).json({ message: 'Genotype deleted successfully' });
        } catch (error) {
            const errorMessage = (error as Error).message;
            res.status(500).json({ message: errorMessage });
        }
    }
}
