import { ConsignmentCare, IConsignmentCare } from "../models/ConsignmentCare";
import { addDays, differenceInDays, isBefore, startOfDay } from 'date-fns'; // Bạn có thể sử dụng thư viện này để tính số ngày
import { Product } from "../models/Product";
import { IUser } from "../models/userModel";

export class ConsignmentCareService {

    // Lấy tất cả Consignment Care
    static async getAllConsignmentCare() {
        const consignmentCareList = await ConsignmentCare.find()
            .populate("userId", "fullName phoneNumber address")
            .populate("productId")
        return consignmentCareList;
    }

    // Lấy ConsignmentCare theo id
    static async getConsignmentCareById(consignmentCareId: IConsignmentCare["_id"]) {
        const consignmentCare = await ConsignmentCare.findById(consignmentCareId)
            .populate("userId", "fullName phoneNumber address")
            .populate("productId")
        if (!consignmentCare) {
            throw new Error("Consignment care is not found.");
        }
        return consignmentCare;
    }

    // tao moi consignment care
    static async createConsignmentCare(data: Partial<IConsignmentCare>) {
        const { userId, productId, careType, startDate, endDate } = data;
        if (!userId || !productId || !careType || !startDate || !endDate) {
            throw new Error("Missing fields.");
        }
        const product = await Product.findById(productId)
        if (!product) {
            throw new Error("Product Id is invalid.");
        } else {
            await Product.findByIdAndUpdate(
                productId,
                { ownerId: userId, status: "Consigned Care", },
                { new: true }
            )
        }
        if (careType != "Normal" && careType != "Special") {
            throw new Error("Care type is invalid.");
        }
        // Kiểm tra nếu startDate trước ngày mai
        const tomorrow = addDays(startOfDay(new Date()), 1);
        if (isBefore(new Date(startDate), tomorrow)) {
            throw new Error("Start date must be from tomorrow onward.");
        }
        // Tính toán số ngày giữa startDate và endDate
        const numberOfDays = differenceInDays(new Date(endDate), new Date(startDate));
        // Nếu endDate trước startDate, ném lỗi
        if (numberOfDays < 0) {
            throw new Error("End date must be after start date.");
        }
        const pricePerDay = careType == "Normal" ? 100000 : 150000;
        const totalPrice = numberOfDays * pricePerDay;
        const newConsignmentCare = await ConsignmentCare.create({
            ...data,
            status: "Care",
            paymentStatus: "Pending",
            pricePerDay,
            totalPrice
        });
        return newConsignmentCare;
    }

    // cập nhật trạng thái
    static async updateStatusById(consignmentCareId: IConsignmentCare["_id"]) {
        const consignmentCare = await ConsignmentCare.findById(consignmentCareId)
        if (!consignmentCare) {
            throw new Error("Consignment care is not found.");
        }
        let newStatus;
        if (consignmentCare.status == "Care") {
            newStatus = "Returned";
        } else {
            newStatus = "Care";
        }
        await Product.findByIdAndUpdate(
            consignmentCare.productId,
            {
                $set: {
                    status: consignmentCare.status == "Care" ? "Consigned Returned" : "Consigned Care",
                }
            },
            { new: true }
        );
        const updatedCare = await ConsignmentCare
            .findByIdAndUpdate(consignmentCareId, { status: newStatus }, { new: true })
            .populate("userId", "fullName phoneNumber address")
            .populate("productId");
        return updatedCare;
    }

    // cập nhật trạng thái thanh toan
    static async updatePaymentStatusById(consignmentCareId: IConsignmentCare["_id"], body: { paymentStatus: string }) {
        const consignmentCare = await ConsignmentCare.findById(consignmentCareId)
        if (!consignmentCare) {
            throw new Error("Consignment care is not found.");
        }
        const { paymentStatus } = body;
        if (paymentStatus != "Success" && paymentStatus != "Cancelled") {
            throw new Error("Payment status is invalid.");
        }
        if (paymentStatus == "Cancelled") {
            await ConsignmentCare.findByIdAndUpdate(
                consignmentCareId,
                { status: "Returned" },
                { new: true }
            )
            await Product.findByIdAndUpdate(
                consignmentCare.productId,
                { status: "Consigned Returned" },
                { new: true }
            )
        }
        const updatedCare = await ConsignmentCare
            .findByIdAndUpdate(consignmentCareId, { paymentStatus: paymentStatus }, { new: true })
            .populate("userId", "fullName phoneNumber address")
            .populate("productId");
        return updatedCare;
    }

    // Lấy ConsignmentCare theo id
    static async getByUserId(userId: IUser["_id"]) {
        const consignmentCare = await ConsignmentCare.find({ userId: userId })
            .populate("productId")
        return consignmentCare;
    }
}