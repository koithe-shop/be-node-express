import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { IUser } from '../models/userModel';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';

// Tạo token
export const generateToken = (userId: IUser["_id"]): string => {
    return jwt.sign({ userId }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

// Xác thực token
export const verifyToken = (token: string) => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        return null;
    }
};
