import { Request, Response } from 'express';
import { OrderService } from '../services/orderService';

// Lấy tất cả order
export const getAllOrders = async (req: Request, res: Response) => {
    try {
        const orders = await OrderService.getAllOrders();
        res.status(200).json(orders);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};