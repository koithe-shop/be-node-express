import { IFeedback, Feedback } from '../models/Feedback';
import { User } from '../models/userModel';
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
        // Lấy tất cả feedbacks và thêm username từ userId
        return await Feedback.find().populate('userId', 'username');
    }

    static async getFeedbackById(id: string) {
        // Lấy feedback theo ID và thêm username từ userId
        return await Feedback.findById(id).populate('userId', 'username');
    }

    static async getFeedbackByCategoryId(categoryId: string) {
        // Lấy feedbacks theo categoryId và thêm username từ userId
        return await Feedback.find({ categoryId }).populate('userId', 'username');
    }

    static async updateFeedback(id: string, data: Partial<IFeedback>) {
        const existingFeedback = await Feedback.findById(id);
        if (!existingFeedback) {
            throw new Error('Feedback not found');
        }

        if (data.userId) {
            const userExists = await User.findById(data.userId);
            if (!userExists) {
                throw new Error('User does not exist');
            }
        }

        if (data.categoryId) {
            const categoryExists = await Category.findById(data.categoryId);
            if (!categoryExists) {
                throw new Error('Category does not exist');
            }
        }

        return await Feedback.findByIdAndUpdate(id, data, { new: true }).populate('userId', 'username');
    }

    static async deleteFeedback(id: string) {
        return await Feedback.findByIdAndDelete(id);
    }
}
