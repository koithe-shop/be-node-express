import { Router } from 'express';
import { getDashboard } from '../controllers/dashboardController';
import { authenticateJWT, isManager } from '../middlewares/authMiddleware';

const router = Router();

/**
 * @swagger
 * /dashboard:
 *   get:
 *     summary: Get all informations
 *     tags: [Dashboard]
 *     responses:
 *       200:
 *         description: All informations of dashboard
 */
router.route("/")
    .get(authenticateJWT, getDashboard)

export default router;
