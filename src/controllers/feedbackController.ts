import { Request, Response } from 'express';
import { FeedbackService } from '../services/feedbackService';
import { body, validationResult } from 'express-validator';

export class FeedbackController {
    static async createFeedback(req: Request, res: Response) {
        // Validation rules
        await body('userId').notEmpty().withMessage('User ID is required').run(req);
        await body('categoryId').notEmpty().withMessage('Category ID is required').run(req);
        await body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5').run(req);
        
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const feedback = await FeedbackService.createFeedback(req.body);
            res.status(201).json(feedback);
        } catch (error) {
            const errorMessage = (error as Error).message;
            res.status(400).json({ message: errorMessage });
        }
    }

    static async getAllFeedback(req: Request, res: Response) {
        try {
            const feedback = await FeedbackService.getAllFeedback();
            res.status(200).json(feedback);
        } catch (error) {
            const errorMessage = (error as Error).message;
            res.status(500).json({ message: errorMessage });
        }
    }

    static async getFeedbackById(req: Request, res: Response) {
        try {
            const feedback = await FeedbackService.getFeedbackById(req.params.id);
            if (!feedback) {
                return res.status(404).json({ message: 'Feedback not found' });
            }
            res.status(200).json(feedback);
        } catch (error) {
            const errorMessage = (error as Error).message;
            res.status(500).json({ message: errorMessage });
        }
    }

    static async updateFeedback(req: Request, res: Response) {
        // Validation rules
        await body('userId').notEmpty().withMessage('User ID is required').run(req);
        await body('categoryId').notEmpty().withMessage('Category ID is required').run(req);
        await body('rating').optional().isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5').run(req);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const feedback = await FeedbackService.updateFeedback(req.params.id, req.body);
            if (!feedback) {
                return res.status(404).json({ message: 'Feedback not found' });
            }
            res.status(200).json(feedback);
        } catch (error) {
            const errorMessage = (error as Error).message;
            res.status(400).json({ message: errorMessage });
        }
    }
    static async deleteFeedback(req: Request, res: Response) {
        try {
            const feedback = await FeedbackService.deleteFeedback(req.params.id);
            if (!feedback) {
                return res.status(404).json({ message: 'Feedback not found' });
            }
            res.status(200).json({ message: 'Feedback deleted successfully' });
        } catch (error) {
            const errorMessage = (error as Error).message;
            res.status(500).json({ message: errorMessage });
        }
    }
}
