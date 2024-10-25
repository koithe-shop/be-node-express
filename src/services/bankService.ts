import { body } from 'express-validator';
import { Bank, IBank } from '../models/bankModel';

export class BankService {
    // Lấy tất cả role
    static async getAllBanks() {
        return Bank.find();
    }
}
