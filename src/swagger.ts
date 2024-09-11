import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Application } from 'express';

// Cấu hình Swagger
const swaggerOptions = {
    definition: {
        openapi: '3.0.0', // Phiên bản OpenAPI
        info: {
            title: 'Koi The Shop', // Tên API
            version: '1.0.0', // Phiên bản API
            description: 'API documentation for my application', // Mô tả API
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                    description: 'Enter JWT Bearer token'
                }
            }
        },
        security: [
            {
                bearerAuth: []
            }
        ],
        servers: [
            {
                url: 'http://localhost:5000/api', // URL của API server
                description: 'Development server'
            }
        ]
    },
    apis: ['./src/routes/*.ts'], // Đường dẫn đến các tệp định nghĩa route
};

// Tạo tài liệu Swagger
const specs = swaggerJsdoc(swaggerOptions);

// Hàm để tích hợp Swagger vào ứng dụng Express
export const setupSwagger = (app: Application) => {
    app.use('/swagger', swaggerUi.serve, swaggerUi.setup(specs));
};
