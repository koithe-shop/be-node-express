import { Router } from 'express';
import { getAllBankAccount, createBankAccount, getBankAccountById, changeStatus } from '../controllers/bankAccountController';
import { authenticateJWT, isManager } from '../middlewares/authMiddleware';

const router = Router();

/**
 * @swagger
 * /bankAccounts:
 *   get:
 *     summary: Get all bank account
 *     tags: [Bank Account]
 *     responses:
 *       200:
 *         description: List of bank account
 *   post:
 *     summary: Create a new account
 *     tags: [Bank Account]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               bankId:
 *                 type: string
 *               accountNumber:
 *                 type: string
 *               ownerName:
 *                 type: string
 *     responses:
 *       201:
 *         description: Account created successfully
 */
router.route("/")
    .get(getAllBankAccount)
    .post(createBankAccount)

/**
* @swagger
* /bankAccounts/{bankAccountId}:
*   get:
*     summary: Get a bankAccount by ID
*     tags: [Bank Account]
*     parameters:
*       - in: path
*         name: bankAccountId
*         required: true
*         schema:
*           type: string
*     responses:
*       200:
*         description: Bank account retrieved successfully
*   delete:
*     summary: Change status bankAccount by ID
*     tags: [Bank Account]
*     parameters:
*       - in: path
*         name: bankAccountId
*         required: true
*         schema:
*           type: string
*     responses:
*       200:
*         description: Change status successfully
*/
router.route("/:bankAccountId")
    .get(getBankAccountById)
    .delete(changeStatus)

export default router;
