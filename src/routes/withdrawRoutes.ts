import { Router } from 'express';
import * as withdrawController from '../controllers/withdrawController';
import { authenticateJWT, isActive, isManager } from '../middlewares/authMiddleware';

const router = Router();

/**
 * @swagger
 * /withdraws:
 *   get:
 *     summary: Get all withdraw
 *     tags: [Withdraw]
 *     responses:
 *       200:
 *         description: List of withdraw
 *   post:
 *     summary: Create a new withdraw
 *     tags: [Withdraw]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               bankAccountId:
 *                 type: string
 *               consignmentSaleId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Withdraw created successfully
 */
router.route("/")
    .get(withdrawController.getAllWithdraw)
    .post(withdrawController.createWithdraw)

/**
* @swagger
* /withdraws/{withdrawId}:
*   get:
*     summary: Get a withdraw by ID
*     tags: [Withdraw]
*     parameters:
*       - in: path
*         name: withdrawId
*         required: true
*         schema:
*           type: string
*     responses:
*       200:
*         description: Withdraw retrieved successfully
*   delete:
*     summary: Change status withdraw by ID
*     tags: [Withdraw]
*     parameters:
*       - in: path
*         name: withdrawId
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
router.route("/:withdrawId")
    .get(withdrawController.getWithdrawById)
    .delete(withdrawController.changeStatus)

/**
* @swagger
* /withdraws/userId/{userId}:
*   get:
*     summary: Get withdraw by userID
*     tags: [Withdraw]
*     parameters:
*       - in: path
*         name: userId
*         required: true
*         schema:
*           type: string
*     responses:
*       200:
*         description: Withdraw retrieved successfully
*/
router.route("/userId/:userId")
    .get(withdrawController.getWithdrawByUserId)

export default router;
