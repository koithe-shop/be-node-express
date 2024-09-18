import { Router } from 'express';
import { createRole, getAllRoles } from '../controllers/roleController';

const router = Router();

/**
 * @swagger
 * /roles:
 *   get:
 *     summary: Get all roles
 *     tags: [Role]
 *     responses:
 *       200:
 *         description: List of roles
 *   post:
 *     summary: Create a new role
 *     tags: [Role]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               roleName:
 *                 type: string
 *     responses:
 *       201:
 *         description: role created successfully
 */
router.route("/")
    .get(getAllRoles)
    .post(createRole)

export default router;
