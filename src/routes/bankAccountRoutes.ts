import { Router } from 'express';
import { getAllBankAccount, createBankAccount, getBankAccountById, changeStatus, getBankAccountByUserId } from '../controllers/bankAccountController';
import { authenticateJWT, isActive, isManager } from '../middlewares/authMiddleware';

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
    .get(authenticateJWT, isActive, getAllBankAccount)
    .post(authenticateJWT, isActive, createBankAccount)

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
    .get(authenticateJWT, isActive, getBankAccountById)
    .delete(authenticateJWT, isActive, changeStatus)

/**
* @swagger
* /bankAccounts/userId/{userId}:
*   get:
*     summary: Get a bankAccount by userID
*     tags: [Bank Account]
*     parameters:
*       - in: path
*         name: userId
*         required: true
*         schema:
*           type: string
*     responses:
*       200:
*         description: Bank account retrieved successfully
*/
router.route("/userId/:userId")
    .get(authenticateJWT, isActive, getBankAccountByUserId)

export default router;
