import { ConsignmentCare, IConsignmentCare } from "../models/ConsignmentCare";
import { differenceInDays } from 'date-fns'; // Bạn có thể sử dụng thư viện này để tính số ngày

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
            .populate("userId", "-password")
            .populate("productId")
        if (!consignmentCare) {
            throw new Error("Consignment care is not found.");
        }
        return consignmentCare;
    }

    // tao moi consignment care
    static async createConsignmentCare(data: Partial<IConsignmentCare>) {
        const { userId, productId, careType, startDate, endDate, pricePerDay } = data;

        // Kiểm tra xem các trường cần thiết có bị thiếu không
        if (!userId || !productId || !careType || !startDate || !endDate || !pricePerDay) {
            throw new Error("Missing fields.");
        }

        // Tính toán số ngày giữa startDate và endDate
        const numberOfDays = differenceInDays(new Date(endDate), new Date(startDate));

        // Nếu endDate trước startDate, ném lỗi
        if (numberOfDays < 0) {
            throw new Error("End date must be after start date.");
        }

        // Tính tổng tiền = số ngày * giá mỗi ngày
        const totalPrice = numberOfDays * pricePerDay;

        // Tạo mới ConsignmentCare với tổng tiền đã tính
        const newConsignmentCare = await ConsignmentCare.create({
            ...data,
            status: "Care",
            paymentStatus: "Pending",
            totalPrice // Thêm tổng tiền vào dữ liệu tạo mới
        });

        // Trả về đối tượng ConsignmentCare mới tạo
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

        const updatedCare = await ConsignmentCare
            .findByIdAndUpdate(consignmentCareId, { status: newStatus }, { new: true })
            .populate("userId", "-password")
            .populate("productId")

        return updatedCare;
    }

}