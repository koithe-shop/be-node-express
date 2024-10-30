import { BankAccount, IBankAccount } from '../models/bankAccountModel';
import { Bank } from '../models/bankModel';
import { ConsignmentSale, IConsignmentSale } from '../models/ConsignmentSale';
import { IUser, User } from '../models/userModel';
import { IWithdraw, Withdraw } from '../models/withdrawModel';

export class WithdrawService {
    static async getAllWithdraw() {
        return Withdraw.find()
            .populate({
                path: "bankAccountId",
                select: "bankId accountNumber ownerName",
                populate: {
                    path: "bankId" // Thay bằng tên reference bên trong bankAccountId nếu có
                }
            })
            .populate({
                path: "userId",
                select: "fullName phoneNumber address",
            })
            .populate({
                path: "consignmentSaleId",
                select: "-userId",
                populate: {
                    path: "productId", // Thay bằng tên reference bên trong consignmentSaleId nếu có
                    select: "productName" // Thay bằng các trường bạn muốn lấy
                }
            });
    }

    static async getWithdrawById(withdrawId: IWithdraw["_id"]) {
        const withdraw = await Withdraw.findById(withdrawId)
            .populate({
                path: "bankAccountId",
                select: "bankId accountNumber ownerName",
                populate: {
                    path: "bankId" // Thay bằng tên reference bên trong bankAccountId nếu có
                }
            })
            .populate({
                path: "userId",
                select: "fullName phoneNumber address",
            })
            .populate({
                path: "consignmentSaleId",
                select: "-userId",
                populate: {
                    path: "productId", // Thay bằng tên reference bên trong consignmentSaleId nếu có
                    select: "productName" // Thay bằng các trường bạn muốn lấy
                }
            });

        if (!withdraw) {
            throw new Error("Withdraw is not found.");
        }
        return withdraw;
    }

    static async createWithdraw(body: Partial<IWithdraw>) {
        const { userId, bankAccountId, consignmentSaleId } = body;
        if (!userId || !bankAccountId || !consignmentSaleId) {
            throw new Error("All fields are required.")
        }
        const user = await User.findById(userId);
        if (!user) {
            throw new Error("UserId is invalid.")
        }
        const bankAccount = await BankAccount.findOne({ _id: bankAccountId, status: "Active" });
        if (!bankAccount) {
            throw new Error("BankAccountId is invalid.")
        }
        const consignmentSale = await ConsignmentSale.findOne({ _id: consignmentSaleId, status: "Sold", paymentStatus: "Pending" });
        if (!consignmentSale) {
            throw new Error("ConsignmentSaleId is invalid.")
        }
        const withdraw = await Withdraw.findOne({ consignmentSaleId: consignmentSaleId })
        if (withdraw) {
            throw new Error("Withdraw is existed.")
        }
        let amount = 0;
        if (consignmentSale.saleType == "Offline") {
            amount = consignmentSale.priceAgreed * 0.9
        } else if (consignmentSale.saleType == "Online") {
            amount = consignmentSale.priceAgreed * 0.95
        }
        const newWithdraw = await Withdraw.create({ ...body, amount: amount, status: "Pending" });

        return newWithdraw;
    }

    static async changeStatus(withdrawId: IWithdraw["_id"], body: { status: IWithdraw["status"] }) {
        // Tìm người dùng theo ID
        const withdraw = await Withdraw.findById(withdrawId);
        if (!withdraw) {
            throw new Error("Withdraw is not found.");
        }
        const { status } = body;
        if (status != "Completed" && status != "Cancelled") {
            throw new Error("Status is invalid.");
        }
        if (status == "Completed") {
            await ConsignmentSale.findById(
                withdraw.consignmentSaleId,
                { paymentStatus: "Success" },
                { new: true }
            )
        }
        const updatedwithdraw = await Withdraw
            .findByIdAndUpdate(withdrawId, { status: status }, { new: true })

        return updatedwithdraw;
    }

    static async getWithdrawByUserId(userId: IUser["_id"]) {
        const withdraws = await Withdraw.find({ userId })
            .populate({
                path: "bankAccountId",
                select: "bankId accountNumber ownerName",
                populate: {
                    path: "bankId" // Thay bằng tên reference bên trong bankAccountId nếu có
                }
            })
            .populate({
                path: "userId",
                select: "fullName phoneNumber address",
            })
            .populate({
                path: "consignmentSaleId",
                select: "-userId",
                populate: {
                    path: "productId", // Thay bằng tên reference bên trong consignmentSaleId nếu có
                    select: "productName" // Thay bằng các trường bạn muốn lấy
                }
            });
        return withdraws;
    }
}
