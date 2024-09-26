import { ICategory, Category } from '../models/Category';

export class CategoryService {
    static async createCategory(data: Partial<ICategory>) {
        // Kiểm tra category đã tồn tại chưa
        const existingCategory = await Category.findOne({ categoryName: data.categoryName });
        if (existingCategory) {
            throw new Error('Category with this name already exists');
        }

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
        // Kiểm tra category có tồn tại không
        const existingCategory = await Category.findById(id);
        if (!existingCategory) {
            throw new Error('Category not found');
        }

        // Nếu tên category thay đổi, kiểm tra xem tên mới đã tồn tại chưa
        if (data.categoryName && data.categoryName !== existingCategory.categoryName) {
            const categoryWithSameName = await Category.findOne({ categoryName: data.categoryName });
            if (categoryWithSameName) {
                throw new Error('Category with this name already exists');
            }
        }

        return await Category.findByIdAndUpdate(id, data, { new: true });
    }

    static async deleteCategory(id: string) {
        return await Category.findByIdAndDelete(id);
    }
}
