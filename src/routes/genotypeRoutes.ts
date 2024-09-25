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
/**
 * @swagger
 * components:
 *   schemas:
 *     Genotype:
 *       type: object
 *       required:
 *         - genotypeName
 *       properties:
 *         genotypeName:
 *           type: string
 *           description: The name of the genotype
 *       example:
 *         genotypeName: "AA-BB"
 */

/**
 * @swagger
 * /genotypes:
 *   post:
 *     summary: Create a new genotype
 *     tags: [Genotypes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Genotype'
 *     responses:
 *       201:
 *         description: Genotype created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Genotype'
 *       400:
 *         description: Bad request
 */
/**
 * @swagger
 * /genotypes:
 *   get:
 *     summary: Get all genotypes
 *     tags: [Genotypes]
 *     responses:
 *       200:
 *         description: List of all genotypes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Genotype'
 */
/**
 * @swagger
 * /genotypes/{id}:
 *   get:
 *     summary: Get a genotype by ID
 *     tags: [Genotypes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the genotype
 *     responses:
 *       200:
 *         description: Genotype retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Genotype'
 *       404:
 *         description: Genotype not found
 */
/**
 * @swagger
 * /genotypes/{id}:
 *   put:
 *     summary: Update a genotype by ID
 *     tags: [Genotypes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the genotype
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Genotype'
 *     responses:
 *       200:
 *         description: Genotype updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Genotype'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Genotype not found
 */
/**
 * @swagger
 * /genotypes/{id}:
 *   delete:
 *     summary: Delete a genotype by ID
 *     tags: [Genotypes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the genotype
 *     responses:
 *       200:
 *         description: Genotype deleted successfully
 *       404:
 *         description: Genotype not found
 */