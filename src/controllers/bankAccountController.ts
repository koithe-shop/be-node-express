import { Request, Response } from 'express';
import { BankAccountService } from '../services/bankAccountService';

export const getAllBankAccount = async (req: Request, res: Response) => {
    try {
        const banks = await BankAccountService.getAllBankAccount();
        res.status(200).json(banks);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getBankAccountById = async (req: Request, res: Response) => {
    try {
        const account = await BankAccountService.getBankAccountById(req.params.bankAccountId);
        res.status(200).json(account);
    } catch (error: any) {
        res.status(404).json({ messgae: error.message });
    }
}

export const createBankAccount = async (req: Request, res: Response) => {
    try {
        const banks = await BankAccountService.createBankAccount(req.body);
        res.status(201).json(banks);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const changeStatus = async (req: Request, res: Response) => {
    try {
        const account = await BankAccountService.changeStatus(req.params.bankAccountId);
        res.status(200).json(account);
    } catch (error: any) {
        res.status(404).json({ message: error.message });
    }
};
