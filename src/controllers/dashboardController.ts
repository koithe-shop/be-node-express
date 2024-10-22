import { Request, Response } from 'express';
import { DashboardService } from '../services/dashboardService';

// Lấy tất cả người dùng
export const getDashboard = async (req: Request, res: Response) => {
    try {
        const dashboard = await DashboardService.getAllInformations();
        res.json(dashboard);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};


