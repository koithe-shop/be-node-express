import { Request, Response } from 'express';
import { ConsignmentCareService } from '../services/consignmentCareService';

// Lấy tất cả consignmentCare
export const getAllConsignmentCare = async (req: Request, res: Response) => {
    try {
        const consignmentCares = await ConsignmentCareService.getAllConsignmentCare();
        res.status(200).json(consignmentCares);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// Lấy consignmentCare theo id
export const getConsignmentCareById = async (req: Request, res: Response) => {
    try {
        const consignmentCare = await ConsignmentCareService.getConsignmentCareById(req.params.consignmentCareId);
        res.status(200).json(consignmentCare);
    } catch (error: any) {
        res.status(404).json({ message: error.message });
    }
};

// Tạo một consignmentCare mới
export const createConsignmentCare = async (req: Request, res: Response) => {
    try {
        const newConsignmentCare = await ConsignmentCareService.createConsignmentCare(req.body);
        res.status(201).json(newConsignmentCare);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

// cập nhật trạng thái
export const updateStatusById = async (req: Request, res: Response) => {
    try {
        const consignmentCare = await ConsignmentCareService.updateStatusById(req.params.consignmentCareId);
        res.status(200).json(consignmentCare);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const getByUserId = async (req: Request, res: Response) => {
    try {
        const consignmentCare = await ConsignmentCareService.getByUserId(req.params.userId);
        res.status(200).json(consignmentCare);
    } catch (error: any) {
        res.status(404).json({ message: error.message });
    }
};