import { Router } from 'express';
import * as ConsignmentCareController from '../controllers/consignmentCareController';
import { authenticateJWT, isManager } from '../middlewares/authMiddleware';

const router = Router();

/**
 * @swagger
 * /consignment_care:
 *   get:
 *     summary: Get all consignment care
 *     tags: [Consignment Care]
 *     responses:
 *       200:
 *         description: Get consignment care list successfully
 *   post:
 *     summary: Create a new onsignment care
 *     tags: [Consignment Care]
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
 *               careType:
 *                 type: string
 *               startDate:
 *                 type: string
 *                 format: date-time
 *               endDate:
 *                 type: string
 *                 format: date-time
 *               pricePerDay:
 *                 type: number
 *               status:
 *                 type: string
 *     responses:
 *       201:
 *         description: Consignment Care created successfully
 */
router.route("/")
    .get(ConsignmentCareController.getAllConsignmentCare)
    .post(ConsignmentCareController.createConsignmentCare)

/**
* @swagger
* /consignment_care/{consignmentCareId}:
*   get:
*     summary: Get a consignment care by ID
*     tags: [Consignment Care]
*     parameters:
*       - in: path
*         name: consignmentCareId
*         required: true
*         schema:
*           type: string
*     responses:
*       200:
*         description: Consignment care retrieved successfully
*/
router.route("/:consignmentCareId")
    .get(ConsignmentCareController.getConsignmentCareById)

export default router;