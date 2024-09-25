import { ICategory, Category } from '../models/Category';

export class CategoryService {
    static async createCategory(data: Partial<ICategory>) {
        const category = new Category(data);
        return await category.save();
    }

    static async getAllCategories() {
        return await Category.find();
    }

    static async getCategoryById(id: string) {
        return await Category.findById(id);
    }

    static async updateCategory(id: string, data: Partial<ICategory>) {
        return await Category.findByIdAndUpdate(id, data, { new: true });
    }

    static async deleteCategory(id: string) {
        return await Category.findByIdAndDelete(id);
    }
}
