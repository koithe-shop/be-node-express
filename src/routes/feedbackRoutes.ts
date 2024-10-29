import { Router } from 'express';
import { FeedbackController } from '../controllers/feedbackController';

const router = Router();


router.post('/', FeedbackController.createFeedback);


router.get('/', FeedbackController.getAllFeedback);


router.get('/:id', FeedbackController.getFeedbackById);


router.put('/:id', FeedbackController.updateFeedback);


router.delete('/:id', FeedbackController.deleteFeedback);


router.get('/category/:categoryId', FeedbackController.getFeedbackByCategoryId);


export default router;
/**
 * @swagger
 * components:
 *   schemas:
 *     Feedback:
 *       type: object
 *       required:
 *         - userId
 *         - categoryId
 *         - rating
 *       properties:
 *         userId:
 *           type: string
 *           description: The ID of the user
 *         categoryId:
 *           type: string
 *           description: The ID of the feedback category
 *         description:
 *           type: string
 *           description: The feedback content
 *         rating:
 *           type: number
 *           description: The rating score (1-5)
 *         date:
 *           type: string
 *           format: date
 *           description: The date of the feedback
 */

/**
 * @swagger
 * /feedback:
 *   post:
 *     summary: Create a new feedback
 *     tags: [Feedback]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Feedback'
 *     responses:
 *       201:
 *         description: Feedback created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Feedback'
 *       400:
 *         description: Validation error or required resource not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       msg:
 *                         type: string
 *                         description: Error message for missing or invalid fields
 *                       param:
 *                         type: string
 *                         description: The field that caused the error
 *       500:
 *         description: Internal server error
 */


/**
 * @swagger
 * /feedback:
 *   get:
 *     summary: Get all feedback
 *     tags: [Feedback]
 *     responses:
 *       200:
 *         description: The list of feedback
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Feedback'
 */

/**
 * @swagger
 * /feedback/{id}:
 *   get:
 *     summary: Get feedback by ID
 *     tags: [Feedback]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The feedback ID
 *     responses:
 *       200:
 *         description: Feedback data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Feedback'
 *       404:
 *         description: Feedback not found
 */
/**
 * @swagger
 * /feedback/category/{categoryId}:
 *   get:
 *     summary: Get feedback by category ID
 *     tags: [Feedback]
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         schema:
 *           type: string
 *         required: true
 *         description: The category ID to filter feedback
 *     responses:
 *       200:
 *         description: The list of feedback for the specified category
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Feedback'
 
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /feedback/{id}:
 *   put:
 *     summary: Update feedback
 *     tags: [Feedback]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The feedback ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Feedback'
 *     responses:
 *       200:
 *         description: Feedback updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Feedback'
 *       400:
 *         description: Validation error or required resource not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       msg:
 *                         type: string
 *                         description: Error message for missing or invalid fields
 *                       param:
 *                         type: string
 *                         description: The field that caused the error
 *       404:
 *         description: Feedback not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /feedback/{id}:
 *   delete:
 *     summary: Delete feedback
 *     tags: [Feedback]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The feedback ID
 *     responses:
 *       200:
 *         description: Feedback deleted successfully
 *       404:
 *         description: Feedback not found
 */
