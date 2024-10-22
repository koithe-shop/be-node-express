import { ConsignmentCare } from "../models/ConsignmentCare";
import { ConsignmentSale } from "../models/ConsignmentSale";
import { Order } from "../models/orderModel";
import { Product } from "../models/Product";
import { Role } from "../models/roleModel";
import { User } from "../models/userModel";

export class DashboardService {
    static async getAllInformations() {
        const customerRole = await Role.findOne({ roleName: "Customer" });
        const customers = await User.find({ roleId: customerRole!._id });
        const products = await Product.find({});
        const orders = await Order.find({});
        const consignmentSales = await ConsignmentSale.find({});
        const consignmentCares = await ConsignmentCare.find({});

        // Tính tổng doanh thu từ orders
        const totalOrderRevenue = orders.reduce((acc, order) => acc + Number(order.totalPrice), 0);

        // Tính tổng doanh thu từ consignmentSales
        const totalConsignmentSalesRevenue = consignmentSales.reduce((acc, sale) => acc + sale.priceAgreed, 0);

        // Tính tổng doanh thu từ consignmentCares
        const totalConsignmentCaresRevenue = consignmentCares.reduce((acc, care) => acc + care.totalPrice, 0);

        // Tính tổng doanh thu
        const totalRevenue = totalOrderRevenue + totalConsignmentSalesRevenue + totalConsignmentCaresRevenue;

        return {
            customers: customers.length,
            products: products.length,
            orders: orders.length,
            consignmentCares: consignmentCares.length,
            consignmentSales: consignmentSales.length,
            totalRevenue: totalRevenue
        };
    }

}
