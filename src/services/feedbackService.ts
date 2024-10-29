import { IFeedback, Feedback } from '../models/Feedback';
import { User } from '../models/userModel'
import { Category } from '../models/Category';

export class FeedbackService {
    static async createFeedback(data: Partial<IFeedback>) {
        // Kiểm tra sự tồn tại của userId
        const userExists = await User.findById(data.userId);
        if (!userExists) {
            throw new Error('User does not exist');
        }

        // Kiểm tra sự tồn tại của categoryId
        const categoryExists = await Category.findById(data.categoryId);
        if (!categoryExists) {
            throw new Error('Category does not exist');
        }

        // Kiểm tra xem feedback của người dùng này đã tồn tại hay chưa
        const existingFeedback = await Feedback.findOne({ userId: data.userId });
        if (existingFeedback) {
            throw new Error('Feedback from this user already exists');
        }

        const feedback = new Feedback(data);
        return await feedback.save();
    }
    static async getAllFeedback() {
        return await Feedback.find();
    }

    static async getFeedbackById(id: string) {
        return await Feedback.findById(id);
    }
    static async getFeedbackByCategoryId(categoryId: string) {
        return await Feedback.find({ categoryId });
    }
    

    static async updateFeedback(id: string, data: Partial<IFeedback>) {
        // Kiểm tra sự tồn tại của feedback
        const existingFeedback = await Feedback.findById(id);
        if (!existingFeedback) {
            throw new Error('Feedback not found');
        }

        // Kiểm tra sự tồn tại của userId (nếu có trong data)
        if (data.userId) {
            const userExists = await User.findById(data.userId);
            if (!userExists) {
                throw new Error('User does not exist');
            }
        }

        // Kiểm tra sự tồn tại của categoryId (nếu có trong data)
        if (data.categoryId) {
            const categoryExists = await Category.findById(data.categoryId);
            if (!categoryExists) {
                throw new Error('Category does not exist');
            }
        }

        return await Feedback.findByIdAndUpdate(id, data, { new: true });
    }
    static async deleteFeedback(id: string) {
        return await Feedback.findByIdAndDelete(id);
    }
}
