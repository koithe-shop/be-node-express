import { IFeedback, Feedback } from '../models/Feedback';

export class FeedbackService {
    static async createFeedback(data: Partial<IFeedback>) {
        
        const existingFeedback = await Feedback.findOne({ userId: data.userId });
        if (existingFeedback) {
            throw new Error('Feedback with this name already exists');
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

    static async updateFeedback(id: string, data: Partial<IFeedback>) {
      
        const existingFeedback = await Feedback.findById(id);
        if (!existingFeedback) {
            throw new Error('Category not found');
        }

        
        

        return await Feedback.findByIdAndUpdate(id, data, { new: true });
    }

    static async deleteFeedback(id: string) {
        return await Feedback.findByIdAndDelete(id);
    }
}
