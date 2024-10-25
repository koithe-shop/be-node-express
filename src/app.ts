import express, { Application } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import { setupSwagger } from './swagger';

// import route tai day nhe
import userRoutes from './routes/userRoutes';
import roleRoutes from './routes/roleRoutes';
import productRoutes from './routes/productRoutes';
import categoryRoutes from './routes/categoryRoutes';
import genotypeRoutes from './routes/genotypeRoutes';
import couponRoutes from './routes/couponRoutes';
import orderRoutes from './routes/orderRoutes';
import consignmentSaleRoutes from './routes/consignmentSaleRoutes';
import consignmentCareRoutes from './routes/consignmentCareRoutes';
import feedbackRoutes from './routes/feedbackRoutes';
import dashboardRoutes from "./routes/dashboardRoutes";
import bankRoutes from "./routes/bankRoutes";
import bankAccountRoutes from "./routes/bankAccountRoutes";

dotenv.config();

const app: Application = express();

// Thiết lập Swagger
setupSwagger(app);

// Kết nối đến MongoDB
const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/koiTheShop';
mongoose.connect(mongoUri)
    .then(() => {
        console.log('Connected to MongoDB');
    }).catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// route tai day nhe
app.use('/api/roles', roleRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes); // Category routes
app.use('/api/genotypes', genotypeRoutes);  // Genotype routes
app.use('/api/coupons', couponRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/consignment_sale', consignmentSaleRoutes);
app.use('/api/consignment_care', consignmentCareRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/banks', bankRoutes);
app.use('/api/bankAccounts', bankAccountRoutes);

module.exports = app;
