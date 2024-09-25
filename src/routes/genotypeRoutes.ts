import { Router } from 'express';
import { GenotypeController } from '../controllers/genotypeController';

const router = Router();

// Create a new genotype
router.post('/', GenotypeController.createGenotype);

// Get all genotypes
router.get('/', GenotypeController.getAllGenotypes);

// Get a genotype by ID
router.get('/:id', GenotypeController.getGenotypeById);

// Update a genotype by ID
router.put('/:id', GenotypeController.updateGenotype);

// Delete a genotype by ID
router.delete('/:id', GenotypeController.deleteGenotype);

export default router;
