import { Request, Response } from 'express';
import { WithdrawService } from '../services/withdrawService';

export const getAllWithdraw = async (req: Request, res: Response) => {
    try {
        const withdraws = await WithdrawService.getAllWithdraw();
        res.status(200).json(withdraws);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getWithdrawById = async (req: Request, res: Response) => {
    try {
        const withdraw = await WithdrawService.getWithdrawById(req.params.withdrawId);
        res.status(200).json(withdraw);
    } catch (error: any) {
        res.status(404).json({ messgae: error.message });
    }
}

export const createWithdraw = async (req: Request, res: Response) => {
    try {
        const withdraw = await WithdrawService.createWithdraw(req.body);
        res.status(201).json(withdraw);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const changeStatus = async (req: Request, res: Response) => {
    try {
        const withdraw = await WithdrawService.changeStatus(req.params.withdrawId, req.body);
        res.status(200).json(withdraw);
    } catch (error: any) {
        res.status(404).json({ message: error.message });
    }
};

export const getWithdrawByUserId = async (req: Request, res: Response) => {
    try {
        const withdraws = await WithdrawService.getWithdrawByUserId(req.params.userId);
        res.status(200).json(withdraws);
    } catch (error: any) {
        res.status(404).json({ messgae: error.message });
    }
}