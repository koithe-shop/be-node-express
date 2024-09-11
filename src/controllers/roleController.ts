import { Request, Response } from 'express';
import { RoleService } from '../services/roleService';

// Lấy tất cả người dùng
export const getAllRoles = async (req: Request, res: Response) => {
    try {
        const roles = await RoleService.getAllRoles();
        res.json(roles);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// Tạo một người dùng mới
export const createRole = async (req: Request, res: Response) => {
    try {
        const newRole = await RoleService.createRole(req.body);
        res.status(201).json(newRole);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};
