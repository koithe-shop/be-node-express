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

// Lấy order theo id
export const getOrdersById = async (req: Request, res: Response) => {
    try {
        const order = await OrderService.getOrdersById(req.params.orderId);
        res.status(200).json(order);
    } catch (error: any) {
        res.status(404).json({ message: error.message });
    }
};

// Tạo một order mới
export const createOrder = async (req: Request, res: Response) => {
    try {
        const newOrder = await OrderService.createOrder(req.body);
        res.status(201).json(newOrder);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const changePaymentStatus = async (req: Request, res: Response) => {
    try {
        const order = await OrderService.changePaymentStatus(req.params.orderId, req.body);
        res.status(200).json(order);
    } catch (error: any) {
        res.status(404).json({ message: error.message });
    }
};
