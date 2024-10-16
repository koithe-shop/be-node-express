import { ConsignmentSale, IConsignmentSale } from "../models/ConsignmentSale";

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

        const newConsignmentSale = await ConsignmentSale.create({
            ...data,
            inspectionStatus: "Pending",
            status: "Pending",
            paymentStatus: "Pending"
        });
        return newConsignmentSale
    }

}