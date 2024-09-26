import { Router } from 'express';
import { ProductController } from '../controllers/productController';
const router: Router = Router();

router.post('/',  ProductController.createProduct);
router.get('/', ProductController.getAllProducts);
router.get('/:id', ProductController.getProductById);
router.put('/:id',  ProductController.updateProduct);
router.delete('/:id', ProductController.deleteProduct);

export default router;
/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - productName
 *         - status
 *         - madeBy
 *         - gender
 *         - size
 *         - yob
 *         - price
 *       properties:
 *         productName:
 *           type: string
 *           description: Name of the product
 *         status:
 *           type: number
 *           description: Status of the product (e.g., available, sold)
 *         madeBy:
 *           type: string
 *           description: Manufacturer or creator of the product
 *         gender:
 *           type: boolean
 *           description: Gender of the product (for livestock/fish)
 *         size:
 *           type: number
 *           description: Size of the product
 *         yob:
 *           type: number
 *           description: Year of birth of the product (if applicable)
 *         character:
 *           type: string
 *           description: Characteristics of the product
 *         certificates:
 *           type: object
 *           properties:
 *             origin:
 *               type: string
 *               description: Origin of the product
 *             health_status:
 *               type: string
 *               description: Health status of the product
 *             awards:
 *               type: array
 *               items:
 *                 type: string
 *               description: Awards the product has won
 *         screeningRate:
 *           type: number
 *           description: Screening rate of the product
 *         foodOnDay:
 *           type: number
 *           description: Daily food consumption of the product
 *         description:
 *           type: string
 *           description: Product description
 *         price:
 *           type: number
 *           description: Price of the product
 *         image:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of product images
 *         categoryId:
 *           type: string
 *           description: ID of the category the product belongs to
 *         genotypeId:
 *           type: string
 *           description: ID of the genotype the product belongs to
 */

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad request
 */
/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of all products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 */
/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Update a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Product updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 */