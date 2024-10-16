import { Coupon, ICoupon } from "../models/Coupon";
import { Order, IOrder } from "../models/orderModel";

export class OrderService {

    // Lấy tất cả order
    static async getAllOrders() {
        const orderList = await Order.find()
            .select("-products")
            .populate("userId", "fullName phoneNumber address")
            .populate("staffId", "fullName")
            .populate("couponId", "discountRate")
        return orderList;
    }

    // Lấy order theo id
    static async getOrdersById(orderId: IOrder["_id"]) {
        const order = await Order.findById(orderId)
            .populate("userId", "fullName phoneNumber address")
            .populate("staffId", "fullName")
            .populate("couponId", "code discountRate")
        if (!order) {
            throw new Error("Order is not found.");
        }
        return order;
    }

    // // tao moi order
    static async createOrder(orderData: Partial<IOrder>) {
        const { userId, staffId, couponId, products } = orderData;
        let coupon: ICoupon | null;
        let totalFinal: number = 0;

        // Kiểm tra xem các trường cần thiết có bị thiếu không
        if (!userId || !products || products.length === 0) {
            throw new Error("Missing fields.");
        }
        // Tính tổng giá trị đơn hàng
        const totalPrice = products.reduce((total, product) => {
            return total + product.price;
        }, 0);

        if (couponId != null) {
            coupon = await Coupon.findById(couponId);
            totalFinal = totalPrice - (totalPrice * (coupon!.discountRate) / 100);
        } else {
            totalFinal = totalPrice;
        }

        const newOrder = await Order.create({
            userId,
            staffId,
            couponId,
            totalPrice: totalFinal,
            status: "Pending",
            paymentStatus: "Pending",
            products
        });
        return newOrder
    }

}