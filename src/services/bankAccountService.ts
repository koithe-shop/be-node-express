import { BankAccount, IBankAccount } from '../models/bankAccountModel';
import { Bank } from '../models/bankModel';
import { User } from '../models/userModel';

export class BankAccountService {
    static async getAllBankAccount() {
        return BankAccount.find()
            .populate("userId", "fullName phoneNumber address")
            .populate("bankId");
    }

    static async getBankAccountById(bankAccountId: IBankAccount["_id"]) {
        const account = await BankAccount.findById(bankAccountId)
            .populate("userId", "fullName phoneNumber address")
            .populate("bankId")
        if (!account) {
            throw new Error("Bank account is not found.");
        }
        return account;
    }

    static async createBankAccount(body: IBankAccount) {
        const { userId, bankId, accountNumber, ownerName } = body;
        if (!userId || !bankId || !accountNumber || !ownerName) {
            throw new Error("All fields are required.")
        }
        const user = await User.findById(userId);
        if (!user) {
            throw new Error("UserId is invalid.")
        }
        const bank = await Bank.findById(bankId);
        if (!bank) {
            throw new Error("BankId is invalid.")
        }
        const newAccount = await BankAccount.create({ ...body, status: "Active" });

        return { newAccount, msg: "Create account successfully" };
    }

    static async changeStatus(bankAccountId: IBankAccount["_id"]) {
        // Tìm người dùng theo ID
        const account = await BankAccount.findById(bankAccountId);
        if (!account) {
            throw new Error("Bank account is not found.");
        }

        let newStatus;
        if (account.status == "Active") {
            newStatus = "Inactive";
        } else {
            newStatus = "Active";
        }

        const updatedAccount = await BankAccount
            .findByIdAndUpdate(bankAccountId, { status: newStatus }, { new: true })
            .populate("userId", "fullName phoneNumber address")
            .populate("bankId")

        return updatedAccount;
    }
}
