import { ConsignmentSale } from "../models/ConsignmentSale";
import { Order, IOrder } from "../models/orderModel";
import { Product } from "../models/Product";
import { IUser } from "../models/userModel";

export class OrderService {

    // Lấy tất cả order
    static async getAllOrders() {
        const orderList = await Order.find()
            .select("-products")
            .populate("userId", "fullName phoneNumber address")
            .populate("staffId", "fullName")
        return orderList;
    }

    // Lấy order theo id
    static async getOrdersById(orderId: IOrder["_id"]) {
        const order = await Order.findById(orderId)
            .populate("userId", "fullName phoneNumber address")
            .populate("staffId", "fullName")
            .populate("products")
        if (!order) {
            throw new Error("Order is not found.");
        }
        return order;
    }

    // Lấy order theo user` id
    static async getOrdersByUserId(userId: IUser["_id"]) {
        const order = await Order.findById({ userId: userId })
            .populate("staffId", "fullName")
            .populate("products")
        return order;
    }

    // // tao moi order
    static async createOrder(orderData: Partial<IOrder>) {
        const { userId, staffId, products, totalPrice, address } = orderData;

        // Kiểm tra xem các trường cần thiết có bị thiếu không
        if (!userId || !products || products.length === 0 || !totalPrice || !address) {
            throw new Error("Missing fields.");
        }

        // Tạo mới Order với tổng giá trị đã tính
        const newOrder = await Order.create({
            userId,
            staffId,
            totalPrice,
            status: "Pending",
            paymentStatus: "Pending",
            products,
            address,
        });

        return newOrder;
    }

    static async changePaymentStatus(orderId: IOrder["_id"], body: { paymentStatus: string }) {
        const { paymentStatus } = body;
        if (paymentStatus != "Success" && paymentStatus != "Cancelled") {
            throw new Error("Payment status is invalid.");
        }
        if (paymentStatus == "Success") {
            await Order.findByIdAndUpdate(
                orderId,
                { status: "Completed" },
                { new: true }
            )
        } else if (paymentStatus == "Cancelled") {
            await Order.findByIdAndUpdate(
                orderId,
                { status: "Cancelled" },
                { new: true }
            )
        }
        const order = await Order.findByIdAndUpdate(
            orderId,
            { paymentStatus },
            { new: true }
        )
            .populate("userId", "fullName phoneNumber address")
            .populate("staffId", "fullName")

        // Cập nhật status của các sản phẩm
        await Product.updateMany(
            { _id: { $in: order!.products }, status: "Consigned Sale" },
            { $set: { status: "Consigned Sold" } }
        );

        await ConsignmentSale.updateMany(
            { productId: { $in: order!.products } },
            { $set: { status: "Sold" } }
        )

        await Product.updateMany(
            { _id: { $in: order!.products }, status: { $ne: "Consigned Sale" } },
            { $set: { status: "Sold" } }
        );

        if (!order) {
            throw new Error("Order is not found.");
        }
        return order;
    }
}