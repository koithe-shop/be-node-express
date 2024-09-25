import { Router } from 'express';
import { CategoryController } from '../controllers/categoryController';

const router = Router();

// Create a new category
router.post('/', CategoryController.createCategory);

// Get all categories
router.get('/', CategoryController.getAllCategories);

// Get a single category by ID
router.get('/:id', CategoryController.getCategoryById);

// Update a category by ID
router.put('/:id', CategoryController.updateCategory);

// Delete a category by ID
router.delete('/:id', CategoryController.deleteCategory);

export default router;
