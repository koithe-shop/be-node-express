import { Router } from 'express';
import { getAllBanks } from '../controllers/bankController';
import { authenticateJWT, isManager } from '../middlewares/authMiddleware';

const router = Router();

/**
 * @swagger
 * /banks:
 *   get:
 *     summary: Get all bank
 *     tags: [Bank]
 *     responses:
 *       200:
 *         description: List of banks
 */
router.route("/")
    .get(getAllBanks)

export default router;
