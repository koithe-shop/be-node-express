import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwtUtils';
import { UserService } from '../services/userService';

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];

    if (authHeader) {
        const token = authHeader.split(' ')[1]; // Format: "Bearer token"

        const decoded = verifyToken(token);

        if (decoded) {
            (req as any).user = decoded;
            next();
        } else {
            res.sendStatus(403); // Forbidden
        }
    } else {
        res.sendStatus(401); // Unauthorized
    }
};

export const isActive = async (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;
    const isActive = await UserService.isActive(user.userId)
    if (isActive) {
        next();
    } else {
        res.sendStatus(403); // Forbidden
    }
}

export const isManager = async (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;
    const isManager = await UserService.isManager(user.userId);
    if (isManager) {
        next();
    } else {
        res.sendStatus(403); // Forbidden
    }
}
