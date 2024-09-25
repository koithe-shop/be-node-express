import { Request, Response } from 'express';
import { CategoryService } from '../services/categoryService';

export class CategoryController {
    static async createCategory(req: Request, res: Response) {
        try {
            const { categoryName } = req.body;

            // Kiểm tra trường bắt buộc
            if (!categoryName) {
                return res.status(400).json({ message: 'Category name is required' });
            }

            // Tạo category
            const category = await CategoryService.createCategory(req.body);
            res.status(201).json(category);
        } catch (error) {
            const errorMessage = (error as Error).message;
            res.status(400).json({ message: errorMessage });
        }
    }

    static async getAllCategories(req: Request, res: Response) {
        try {
            const categories = await CategoryService.getAllCategories();
            res.status(200).json(categories);
        } catch (error) {
            const errorMessage = (error as Error).message;
            res.status(500).json({ message: errorMessage });
        }
    }

    static async getCategoryById(req: Request, res: Response) {
        try {
            const category = await CategoryService.getCategoryById(req.params.id);
            if (!category) {
                return res.status(404).json({ message: 'Category not found' });
            }
            res.status(200).json(category);
        } catch (error) {
            const errorMessage = (error as Error).message;
            res.status(500).json({ message: errorMessage });
        }
    }

    static async updateCategory(req: Request, res: Response) {
        try {
            const { categoryName } = req.body;

            // Kiểm tra trường bắt buộc
            if (!categoryName) {
                return res.status(400).json({ message: 'Category name is required' });
            }

            // Cập nhật category
            const category = await CategoryService.updateCategory(req.params.id, req.body);
            if (!category) {
                return res.status(404).json({ message: 'Category not found' });
            }

            res.status(200).json(category);
        } catch (error) {
            const errorMessage = (error as Error).message;
            res.status(400).json({ message: errorMessage });
        }
    }
    static async deleteCategory(req: Request, res: Response) {
        try {
            const category = await CategoryService.deleteCategory(req.params.id);
            if (!category) {
                return res.status(404).json({ message: 'Category not found' });
            }
            res.status(200).json({ message: 'Category deleted successfully' });
        } catch (error) {
            const errorMessage = (error as Error).message;
            res.status(500).json({ message: errorMessage });
        }
    }
}
