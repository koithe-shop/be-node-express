import { Router } from 'express';
import * as ConsignmentSaleController from '../controllers/consignmentSaleController';
import { authenticateJWT, isActive, isManager } from '../middlewares/authMiddleware';

const router = Router();

/**
 * @swagger
 * /consignment_sale:
 *   get:
 *     summary: Get all consignment_sale
 *     tags: [Consignment Sale]
 *     responses:
 *       200:
 *         description: Get consignment_sale list successfully
 *   post:
 *     summary: Create a new onsignment_sale
 *     tags: [Consignment Sale]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               productId:
 *                 type: string
 *               saleType:
 *                 type: string
 *               priceAgreed:
 *                 type: number
 *     responses:
 *       201:
 *         description: Consignment sale created successfully
 */
router.route("/")
    .get(authenticateJWT, isActive, ConsignmentSaleController.getAllConsignmentSale)
    .post(authenticateJWT, isActive, ConsignmentSaleController.createConsignmentSale)

/**
* @swagger
* /consignment_sale/{consignmentSaleId}:
*   get:
*     summary: Get a consignment sale by ID
*     tags: [Consignment Sale]
*     parameters:
*       - in: path
*         name: consignmentSaleId
*         required: true
*         schema:
*           type: string
*     responses:
*       200:
*         description: Consignment sale retrieved successfully
*/
router.route("/:consignmentSaleId")
    .get(authenticateJWT, isActive, ConsignmentSaleController.getConsignmentSaleById)

/**
* @swagger
* /consignment_sale/change_inspection_status/{consignmentSaleId}:
*   put:
*     summary: Change inspection status a consignment sale by ID
*     tags: [Consignment Sale]
*     parameters:
*       - in: path
*         name: consignmentSaleId
*         required: true
*         schema:
*           type: string
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               inspectionStatus:
*                 type: string
*     responses:
*       200:
*         description: Change inspection status successfully
*/
router.route("/change_inspection_status/:consignmentSaleId")
    .put(authenticateJWT, isActive, ConsignmentSaleController.changeInspectionStatus)

/**
* @swagger
* /consignment_sale/change_status/{consignmentSaleId}:
*   put:
*     summary: Change status a consignment sale by ID
*     tags: [Consignment Sale]
*     parameters:
*       - in: path
*         name: consignmentSaleId
*         required: true
*         schema:
*           type: string
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               status:
*                 type: string
*     responses:
*       200:
*         description: Change status successfully
*/
router.route("/change_status/:consignmentSaleId")
    .put(authenticateJWT, isActive, ConsignmentSaleController.changeStatus)

/**
* @swagger
* /consignment_sale/userId/{userId}:
*   get:
*     summary: Get by user ID
*     tags: [Consignment Sale]
*     parameters:
*       - in: path
*         name: userId
*         required: true
*         schema:
*           type: string
*     responses:
*       200:
*         description: Get by user ID successfully
*/
router.route("/userId/:userId")
    .get(authenticateJWT, isActive, ConsignmentSaleController.getByUserId)

export default router;