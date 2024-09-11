import { User, IUser } from '../models/userModel';

export class UserService {
    // Lấy tất cả người dùng
    static async getAllUsers() {
        return User.find(); // Lấy tất cả người dùng
    }

    // Tạo một người dùng mới
    static async createUser(userData: IUser) {
        const newUser = new User(userData);
        await newUser.save();
        return newUser;
    }

    // Tìm người dùng theo username
    static async findUserByUsername(username: string) {
        return User.findOne({ username });
    }
}
