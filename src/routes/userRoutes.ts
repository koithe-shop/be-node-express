import { Router } from 'express';
import * as UserController from '../controllers/userController';
import { authenticateJWT, isManager } from '../middlewares/authMiddleware';

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
    .get(UserController.getAllUsers)
    .post(UserController.createUser)

/**
 * @swagger
 * /users/staff:
 *   get:
 *     summary: Get all staffs
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Get staffs list successfully
 *   post:
 *     summary: Create a new staff
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
 *     responses:
 *       201:
 *         description: Staff created successfully
 */
router.route("/staff")
    .get(UserController.getAllStaffs)
    .post(UserController.createStaff)

/**
* @swagger
* /users/customer:
*   get:
*     summary: Get all customers
*     tags: [User]
*     responses:
*       200:
*         description: Get customers list successfully
*   post:
*     summary: Create a new customer
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
*     responses:
*       201:
*         description: Customer created successfully
*/
router.route("/customer")
    .get(UserController.getAllCustomers)
    .post(UserController.createCustomer)

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
    .post(UserController.login)

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
    .get(UserController.getUserById)
    .delete(UserController.changeStatus)

export default router;
