import { Request, Response } from 'express';
import Stripe from 'stripe';

const stripe = new Stripe(
    'sk_test_51QDr1gIqcInfzhBvJ5rZlRgzNxvDkT6QsHnZ9pmeEIHtrrS0dsN95TzKqUayzdn8rdf7mJHie30V32CXlLhBNi7l00D5XJkSow'
);

// Controller để tạo PaymentIntent
export const createPaymentIntent = async (req: Request, res: Response) => {
    try {
        const { amount } = req.body;

        // Tạo PaymentIntent với Stripe
        const paymentIntent = await stripe.paymentIntents.create({
            amount, // Số tiền tính bằng đơn vị nhỏ nhất của loại tiền tệ
            currency: 'vnd', // Đơn vị tiền tệ, "vnd" cho tiền Việt Nam
        });

        res.status(200).json({ clientSecret: paymentIntent.client_secret });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};
