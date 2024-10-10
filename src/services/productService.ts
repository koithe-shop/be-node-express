import { Product, IProduct } from '../models/Product';

export class ProductService {
    static async createProduct(productData: IProduct) {
        // Kiểm tra xem sản phẩm với tên này đã tồn tại chưa
        const existingProduct = await Product.findOne({ productName: productData.productName });
        if (existingProduct) {
            throw new Error('Product with this name already exists');
        }

        const product = new Product(productData);
        await product.save();

        // Populate categoryId, genotypeId và ownerId để lấy thông tin chi tiết
        return await Product.findById(product._id)
            .populate('categoryId')
            .populate('genotypeId')
           // .populate('ownerId');
    }

    static async getAllProducts() {
        // Populate categoryId, genotypeId và ownerId
        return await Product.find()
            .populate('categoryId genotypeId ownerId');
    }

    static async getProductById(id: string) {
        // Populate categoryId, genotypeId và ownerId
        return await Product.findById(id)
            .populate('categoryId genotypeId ownerId');
    }

    static async updateProduct(id: string, productData: Partial<IProduct>) {
        // Kiểm tra sản phẩm có tồn tại không
        const existingProduct = await Product.findById(id);
        if (!existingProduct) {
            throw new Error('Product not found');
        }

        // Kiểm tra sự thay đổi của status
        const validStatusChanges: Record<string, string[]> = {
            "Available": ["Unavailable", "Sold", "Consigned Sale", "Consigned Care"],
            "Consigned Sale": ["Consigned Sold"],
            "Consigned Care": ["Consigned Returned"]
        };

        if (productData.status && productData.status !== existingProduct.status) {
            const allowedStatuses = validStatusChanges[existingProduct.status];

            // Nếu không tìm thấy trạng thái hiện tại hoặc chuyển đổi không hợp lệ
            if (!allowedStatuses || !allowedStatuses.includes(productData.status)) {
                throw new Error(
                    `Invalid status transition from '${existingProduct.status}' to '${productData.status}'.`
                );
            }
        }

        // Nếu tên sản phẩm thay đổi, kiểm tra xem tên mới đã tồn tại chưa
        if (productData.productName && productData.productName !== existingProduct.productName) {
            const productWithSameName = await Product.findOne({ productName: productData.productName });
            if (productWithSameName) {
                throw new Error('Product with this name already exists');
            }
        }

        // Cập nhật sản phẩm
        const updatedProduct = await Product.findByIdAndUpdate(id, productData, { new: true })
            .populate('categoryId')
            .populate('genotypeId')
            //.populate('ownerId'); // Nếu cần populate ownerId, có thể kích hoạt dòng này

        return updatedProduct;
    }

    static async deleteProduct(id: string) {
        return await Product.findByIdAndDelete(id);
    }
}
