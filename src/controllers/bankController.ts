import { Request, Response } from 'express';
import { BankService } from '../services/bankService';

export const getAllBanks = async (req: Request, res: Response) => {
    try {
        const banks = await BankService.getAllBanks();
        res.status(200).json(banks);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
