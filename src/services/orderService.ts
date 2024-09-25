import { Order, IOrder } from "../models/orderModel";

export class OrderService {

    // Lấy tất cả order
    static async getAllOrders() {
        const orderList = await Order.find()
            .select("-products")
            .populate("userId")
            .populate("couponId")
        return orderList;
    }
}