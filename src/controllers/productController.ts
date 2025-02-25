import { Request, Response } from 'express';
import { ProductService } from '../services/productService';

export class ProductController {
    static async createProduct(req: Request, res: Response) {
        try {
            const { productName, madeBy, gender, size, yob, price } = req.body;
            
            // Kiểm tra các trường bắt buộc
            if (!productName || !madeBy || gender == null || !size || !yob || !price) {
                return res.status(400).json({ message: 'Missing required fields' });
            }
    
            // Đặt status mặc định là 'Available'
            const productData = {
                ...req.body,
                status: 'Available'
            };
    
            // Tạo sản phẩm
            const product = await ProductService.createProduct(productData);
            res.status(201).json(product);
        } catch (error) {
            const errorMessage = (error as Error).message;
            res.status(400).json({ message: errorMessage });
        }
    }
    // Thêm vào trong ProductController
static async createConsignedSaleProduct(req: Request, res: Response) {
    try {
        const { productName, madeBy, gender, size, yob, price } = req.body;
        
        // Kiểm tra các trường bắt buộc
        if (!productName || !madeBy || gender == null || !size || !yob || !price) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // Đặt status mặc định là 'Consigned Sale'
        const productData = {
            ...req.body,
            status: 'Consigned Sale'
        };

        // Tạo sản phẩm
        const product = await ProductService.createProduct(productData);
        res.status(201).json(product);
    } catch (error) {
        const errorMessage = (error as Error).message;
        res.status(400).json({ message: errorMessage });
    }
}

static async createConsignedCareProduct(req: Request, res: Response) {
    try {
        const { productName, madeBy, gender, size, yob, price } = req.body;
        
        // Kiểm tra các trường bắt buộc
        if (!productName || !madeBy || gender == null || !size || !yob || !price) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // Đặt status mặc định là 'Consigned Care'
        const productData = {
            ...req.body,
            status: 'Consigned Care'
        };

        // Tạo sản phẩm
        const product = await ProductService.createProduct(productData);
        res.status(201).json(product);
    } catch (error) {
        const errorMessage = (error as Error).message;
        res.status(400).json({ message: errorMessage });
    }
}

    

    static async getAllProducts(req: Request, res: Response) {
        try {
            const products = await ProductService.getAllProducts();
            res.status(200).json(products);
        } catch (error) {
            const errorMessage = (error as Error).message;
            res.status(500).json({ message: errorMessage });
        }
    }

    static async getProductById(req: Request, res: Response) {
        try {
            const product = await ProductService.getProductById(req.params.id);
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.status(200).json(product);
        } catch (error) {
            const errorMessage = (error as Error).message;
            res.status(500).json({ message: errorMessage });
        }
    }
    static async getProductsByCategoryId(req: Request, res: Response) {
        try {
            const { categoryId } = req.params;
            const products = await ProductService.getProductsByCategoryId(categoryId);
            res.status(200).json(products);
        } catch (error) {
            const errorMessage = (error as Error).message;
            res.status(500).json({ message: errorMessage });
        }
    }
    
    static async updateProduct(req: Request, res: Response) {
        try {
            const { productName, status, madeBy, gender, size, yob, price } = req.body;
    
            // Kiểm tra các trường bắt buộc
            if (!status || !madeBy || gender == null || !size || !yob || !price) {
                return res.status(400).json({ message: 'Missing required fields' });
            }

            // Cập nhật sản phẩm
            const product = await ProductService.updateProduct(req.params.id, req.body);
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
    
            res.status(200).json(product);
        } catch (error) {
            const errorMessage = (error as Error).message;
            res.status(400).json({ message: errorMessage });
        }
    }

    static async deleteProduct(req: Request, res: Response) {
        try {
            const product = await ProductService.deleteProduct(req.params.id);
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.status(200).json({ message: 'Product deleted successfully' });
        } catch (error) {
            const errorMessage = (error as Error).message;
            res.status(500).json({ message: errorMessage });
        }
    }
}
