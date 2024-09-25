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

        // Populate categoryId và genotypeId để lấy tên danh mục và kiểu gen
        return await Product.findById(product._id).populate('categoryId').populate('genotypeId');
    }

    static async getAllProducts() {
        return await Product.find().populate('categoryId genotypeId');
    }

    static async getProductById(id: string) {
        return await Product.findById(id).populate('categoryId genotypeId');
    }

    static async updateProduct(id: string, productData: Partial<IProduct>) {
        // Kiểm tra sản phẩm có tồn tại không
        const existingProduct = await Product.findById(id);
        if (!existingProduct) {
            throw new Error('Product not found');
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
            .populate('categoryId') // Thêm populate cho categoryId
            .populate('genotypeId'); // Thêm populate cho genotypeId

        return updatedProduct;
    }
    static async deleteProduct(id: string) {
        return await Product.findByIdAndDelete(id);
    }
}