import { Request, Response } from 'express';
import { UserService } from '../services/userService';

// Lấy tất cả người dùng
export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await UserService.getAllUsers();
        res.status(200).json(users);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// Lấy người dùng theo Id
export const getUserById = async (req: Request, res: Response) => {
    try {
        const user = await UserService.getUserById(req.params.userId);
        res.status(200).json(user);
    } catch (error: any) {
        res.status(404).json({ messgae: error.message });
    }
}

// Tạo một người dùng mới
export const createUser = async (req: Request, res: Response) => {
    try {
        const newUser = await UserService.createUser(req.body);
        res.status(201).json(newUser);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

// Thay đổi trạng thái người dùng
export const changeStatus = async (req: Request, res: Response) => {
    try {
        const updatedUser = await UserService.changeStatusUser(req.params.userId);
        res.status(201).json(updatedUser);
    } catch (error: any) {
        res.status(404).json({ message: error.message });
    }
};

// Dang nhap
export const login = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    try {
        const data = await UserService.login(username, password);
        res.status(200).json(data);
    } catch (error: any) {
        res.status(404).json({ message: error.message });
    }
}
