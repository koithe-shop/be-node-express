import { ConsignmentSale, IConsignmentSale } from "../models/ConsignmentSale";
import { Product } from "../models/Product";
import { IUser } from "../models/userModel";

export class ConsignmentSaleService {

    // Lấy tất cả Consignment Sale
    static async getAllConsignmentSale() {
        const consignmentSaleList = await ConsignmentSale.find()
            .populate("userId", "fullName phoneNumber address")
            .populate("productId")
        return consignmentSaleList;
    }

    // Lấy ConsignmentSale theo id
    static async getConsignmentSaleById(consignmentSaleId: IConsignmentSale["_id"]) {
        const consignmentSale = await ConsignmentSale.findById(consignmentSaleId)
            .populate("userId", "-password")
            .populate("productId")
        if (!consignmentSale) {
            throw new Error("Consignment sale is not found.");
        }
        return consignmentSale;
    }

    // // tao moi consignment sale
    static async createConsignmentSale(data: Partial<IConsignmentSale>) {
        const { userId, productId, saleType, priceAgreed } = data;
        // Kiểm tra xem các trường cần thiết có bị thiếu không
        if (!userId || !productId || !saleType || !priceAgreed) {
            throw new Error("Missing fields.");
        }
        const product = await Product.findById(productId)
        if (!product) {
            throw new Error("Product Id is invalid.");
        } else {
            await Product.findByIdAndUpdate(
                productId,
                { ownerId: userId, status: "Consigned Sale" },
                { new: true }
            )
        }
        const newConsignmentSale = await ConsignmentSale.create({
            ...data,
            inspectionStatus: "Pending",
            status: "Pending",
            paymentStatus: "Pending"
        });
        return newConsignmentSale
    }

    // Cập nhật inspection status
    static async changeInspectionStatus(consignmentSaleId: IConsignmentSale["_id"], body: { inspectionStatus: string }) {
        const { inspectionStatus } = body;
        if (inspectionStatus != "Passed" && inspectionStatus != "Failed") {
            throw new Error("Inspection status is invalid.");
        }
        const consignmentSale = await ConsignmentSale.findById(consignmentSaleId)
        if (!consignmentSale) {
            throw new Error("Consignment sale is not found.");
        }
        if (inspectionStatus == "Failed") {
            await ConsignmentSale.findByIdAndUpdate(
                consignmentSaleId,
                { status: "Cancelled", paymentStatus: "Cancelled" },
                { new: true }
            )
            await Product.findByIdAndUpdate(
                consignmentSale.productId,
                { status: "Consigned Returned" },
                { new: true }
            )
        } else if (inspectionStatus == "Passed") {
            await ConsignmentSale.findByIdAndUpdate(
                consignmentSaleId,
                { status: "Active" },
                { new: true }
            )
        }
        const updatedSale = await ConsignmentSale
            .findByIdAndUpdate(consignmentSaleId, { inspectionStatus: inspectionStatus }, { new: true })
            .populate("userId", "-password")
            .populate("productId")
        return updatedSale;
    }

    // Cập nhật status
    static async changeStatus(consignmentSaleId: IConsignmentSale["_id"], body: { status: string }) {
        const { status } = body;
        if (status != "Cancelled") {
            throw new Error("Status is invalid.");
        }
        const consignmentSale = await ConsignmentSale.findById(consignmentSaleId)
        if (!consignmentSale) {
            throw new Error("Consignment sale is not found.");
        }
        await Product.findByIdAndUpdate(
            consignmentSale.productId,
            { status: "Consigned Returned" },
            { new: true }
        )
        const updatedSale = await ConsignmentSale
            .findByIdAndUpdate(
                consignmentSaleId,
                { status: status, paymentStatus: "Cancelled" },
                { new: true })
            .populate("userId", "-password")
            .populate("productId")
        return updatedSale;
    }

    // Lấy ConsignmentSale theo id
    static async getByUserId(userId: IUser["_id"]) {
        const consignmentSale = await ConsignmentSale.find({ userId: userId })
            .populate("productId")
        return consignmentSale;
    }
}