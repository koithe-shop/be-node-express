import { Router } from 'express';
import { createUser, getAllUsers, getUserById, changeStatus, login } from '../controllers/userController';

const router = Router();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Get users list successfully
 *   post:
 *     summary: Create a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               address:
 *                 type: string
 *               roleId:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 */
router.route("/")
    .get(getAllUsers)
    .post(createUser)

/**
* @swagger
* /users/login:
*   post:
*     summary: Login
*     tags: [User]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               username:
*                 type: string
*               password:
*                 type: string
*     responses:
*       200:
*         description: Login successful
*/
router.route("/login")
    .post(login)

/**
* @swagger
* /users/{userId}:
*   get:
*     summary: Get a user by ID
*     tags: [User]
*     parameters:
*       - in: path
*         name: userId
*         required: true
*         schema:
*           type: string
*     responses:
*       200:
*         description: User retrieved successfully
*   delete:
*      summary: Change status user by ID
*      tags: [User]
*      parameters:
*       - in: path
*         name: userId
*         required: true
*         schema:
*           type: string
*      responses:
*        200:
*          description: Change status   successfully
*/
router.route("/:userId")
    .get(getUserById)
    .delete(changeStatus)

export default router;
