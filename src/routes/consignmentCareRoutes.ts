import { Router } from 'express';
import * as ConsignmentCareController from '../controllers/consignmentCareController';
import { authenticateJWT, isActive, isManager } from '../middlewares/authMiddleware';

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
 *     responses:
 *       201:
 *         description: Consignment Care created successfully
 */
router.route("/")
    .get(authenticateJWT, isActive, ConsignmentCareController.getAllConsignmentCare)
    .post(authenticateJWT, isActive, ConsignmentCareController.createConsignmentCare)

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
    .get(authenticateJWT, isActive, ConsignmentCareController.getConsignmentCareById)

/**
* @swagger
* /consignment_care/change_status/{consignmentCareId}:
*   put:
*     summary: Change status a consignment care by ID
*     tags: [Consignment Care]
*     parameters:
*       - in: path
*         name: consignmentCareId
*         required: true
*         schema:
*           type: string
*     responses:
*       200:
*         description: Change status consignment care successfully
*/
router.route("/change_status/:consignmentCareId")
    .put(authenticateJWT, isActive, ConsignmentCareController.updateStatusById)

/**
* @swagger
* /consignment_care/change_payment_status/{consignmentCareId}:
*   put:
*     summary: Change payment status a consignment care by ID
*     tags: [Consignment Care]
*     parameters:
*       - in: path
*         name: consignmentCareId
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
*               paymentStatus:
*                 type: string
*     responses:
*       200:
*         description: Change payment status consignment care successfully
*/
router.route("/change_payment_status/:consignmentCareId")
    .put(authenticateJWT, isActive, ConsignmentCareController.updatePaymentStatusById)

/**
* @swagger
* /consignment_care/userId/{userId}:
*   get:
*     summary: Get by userID
*     tags: [Consignment Care]
*     parameters:
*       - in: path
*         name: userId
*         required: true
*         schema:
*           type: string
*     responses:
*       200:
*         description: Get by userID successfully
*/
router.route("/userId/:userId")
    .get(authenticateJWT, isActive, ConsignmentCareController.getByUserId)

export default router;