import { Request, Response } from 'express';
import { ConsignmentSaleService } from '../services/consignmentSaleService';

// Lấy tất cả consignmentSale
export const getAllConsignmentSale = async (req: Request, res: Response) => {
    try {
        const consignmentSales = await ConsignmentSaleService.getAllConsignmentSale();
        res.status(200).json(consignmentSales);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// Lấy consignmentSale theo id
export const getConsignmentSaleById = async (req: Request, res: Response) => {
    try {
        const consignmentSale = await ConsignmentSaleService.getConsignmentSaleById(req.params.consignmentSaleId);
        res.status(200).json(consignmentSale);
    } catch (error: any) {
        res.status(404).json({ message: error.message });
    }
};

// Tạo một consignmentSale mới
export const createConsignmentSale = async (req: Request, res: Response) => {
    try {
        const newConsignmentSale = await ConsignmentSaleService.createConsignmentSale(req.body);
        res.status(201).json(newConsignmentSale);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};