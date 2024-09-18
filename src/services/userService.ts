import { Error } from 'mongoose';
import { User, IUser } from '../models/userModel';
import bcrypt from 'bcrypt';
import { generateToken } from '../utils/jwtUtils';

export class UserService {
    // Lấy tất cả người dùng
    static async getAllUsers() {
        const userList = await User.find()
            .select('-password') // Loại bỏ trường password
            .populate('roleId'); // Nếu bạn muốn populate roleId
        return userList; // Lấy tất cả người dùng
    }

    // Lấy người dùng theo id
    static async getUserById(userId: IUser["_id"]) {
        const user = await User.findById(userId)
            .select('-password') // Loại bỏ trường password
            .populate('roleId'); // Nếu bạn muốn populate roleId
        if (!user) {
            throw new Error("User is not found.");
        }
        return user;
    }

    // Tạo một người dùng mới
    static async createUser(userData: IUser) {
        const { fullName, username, password, phoneNumber, address, roleId } = userData;
        if (!fullName || !username || !password || !phoneNumber || !address || !roleId) {
            throw new Error("All fields are required.")
        }
        const checkUsername = await User.findOne({ username });
        if (checkUsername) {
            throw new Error("Username is existed.")
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ ...userData, password: hashedPassword });

        // Trả về thông tin người dùng mới, nhưng không bao gồm password
        const { password: _, ...userWithoutPassword } = newUser.toObject();
        return { userWithoutPassword, msg: "Create user successfully" };
    }

    // Thay đổi trạng thái người dùng
    static async changeStatusUser(userId: IUser["_id"]) {
        // Tìm người dùng theo ID
        const user = await User.findById(userId);
        if (!user) {
            throw new Error("User is not found.");
        }

        // Đảo ngược trạng thái hiện tại của người dùng
        const newStatus = !user.status;

        // Cập nhật trạng thái mới cho người dùng
        const updatedUser = await User
            .findByIdAndUpdate(userId, { status: newStatus }, { new: true })
            .select('-password') // Loại bỏ trường password
            .populate('roleId'); // Nếu bạn muốn populate roleId;

        return updatedUser;
    }

    // Dang nhap
    static async login(username: string, password: string) {
        // Kiểm tra xem người dùng có tồn tại hay không
        const user = await User.findOne({ username });
        if (!user) {
            throw new Error("User not found");
        }

        // So sánh mật khẩu đã nhập với mật khẩu đã mã hóa trong database
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid password')
        }

        // Tạo JWT token
        const token = generateToken(user._id);

        // Trả về token cho người dùng
        return { token, message: 'Login successful' };

    }
}
