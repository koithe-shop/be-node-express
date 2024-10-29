import { Error } from 'mongoose';
import { User, IUser } from '../models/userModel';
import { Role } from '../models/roleModel';
import bcrypt from 'bcrypt';
import { generateToken } from '../utils/jwtUtils';

export class UserService {
    // Kiem tra la manager
    static async isManager(userId: IUser["_id"]) {
        const managerRole = await Role.findOne({ roleName: 'Manager' });
        const user = await User.findOne({ _id: userId, roleId: managerRole?._id });
        if (user) return true;
        else return false;
    }

    static async isActive(userId: IUser["_id"]) {
        const user = await User.findOne({ _id: userId, status: "Active" });
        if (user) return true;
        else return false;
    }

    // Lấy tất cả người dùng
    static async getAllUsers() {
        const roleManager: any = await Role.findOne({ roleName: "Manager" })
        const userList = await User.find({ roleId: { $ne: roleManager._id } })
            .select('-password') // Loại bỏ trường password
            .populate('roleId'); // Nếu bạn muốn populate roleId
        return userList; // Lấy tất cả người dùng
    }

    // Lấy tất cả staff
    static async getAllStaffs() {
        // Tìm roleId tương ứng với role 'staff'
        const staffRole = await Role.findOne({ roleName: 'Staff' });
        const staffList = await User.find({ roleId: staffRole?._id })
            .select('-password') // Loại bỏ trường password
            .populate('roleId'); // Nếu bạn muốn populate roleId
        return staffList; // Lấy tất cả staff
    }

    // Lấy tất cả customer
    static async getAllCustomers() {
        // Tìm roleId tương ứng với role 'customer'
        const customerRole = await Role.findOne({ roleName: 'Customer' });
        const customerList = await User.find({ roleId: customerRole?._id })
            .select('-password') // Loại bỏ trường password
            .populate('roleId'); // Nếu bạn muốn populate roleId
        return customerList; // Lấy tất cả customer
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

    // Tạo một staff mới
    static async createStaff(userData: IUser) {
        const staffRole = await Role.findOne({ roleName: 'Staff' });
        const { fullName, username, password, phoneNumber, address } = userData;
        if (!fullName || !username || !password || !phoneNumber || !address) {
            throw new Error("All fields are required.")
        }
        const checkUsername = await User.findOne({ username });
        if (checkUsername) {
            throw new Error("Username is existed.")
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newStaff = await User.create({ ...userData, password: hashedPassword, roleId: staffRole?._id });

        // Trả về thông tin staff mới, nhưng không bao gồm password
        const { password: _, ...staffWithoutPassword } = newStaff.toObject();
        return { staffWithoutPassword, msg: "Create staff successfully" };
    }

    // Tạo một customer mới
    static async createCustomer(userData: IUser) {
        const customerRole = await Role.findOne({ roleName: 'Customer' });
        const { fullName, username, password, phoneNumber, address } = userData;
        if (!fullName || !username || !password || !phoneNumber || !address) {
            throw new Error("All fields are required.")
        }
        const checkUsername = await User.findOne({ username });
        if (checkUsername) {
            throw new Error("Username is existed.")
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newCustomer = await User.create({ ...userData, password: hashedPassword, roleId: customerRole?._id });

        // Trả về thông tin staff mới, nhưng không bao gồm password
        const { password: _, ...customerWithoutPassword } = newCustomer.toObject();
        return { customerWithoutPassword, msg: "Create customer successfully" };
    }

    // Thay đổi trạng thái người dùng
    static async changeStatusUser(userId: IUser["_id"]) {
        // Tìm người dùng theo ID
        const user = await User.findById(userId);
        if (!user) {
            throw new Error("User is not found.");
        }

        // Đảo ngược trạng thái hiện tại của người dùng
        let newStatus;
        if (user.status == "Active") {
            newStatus = "Inactive";
        } else {
            newStatus = "Active";
        }

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
        const user = await User.findOne({ username, status: "Active" });
        if (!user) {
            throw new Error("User not found");
        }

        const role = await Role.findById(user.roleId);

        // So sánh mật khẩu đã nhập với mật khẩu đã mã hóa trong database
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid password')
        }

        // Tạo JWT token
        const token = generateToken(user._id, user.fullName, role!.roleName);

        // Trả về token cho người dùng
        return { token, message: 'Login successful' };
    }

    // update
    static async updateUser(userId: String, updateData: Partial<IUser>) {
        const { fullName, phoneNumber, address, roleId } = updateData;

        const user = await User.findById(userId);
        if (!user) {
            throw new Error("User is not found.")
        }

        if (fullName != null && fullName != user.fullName) {
            user.fullName = fullName
        }

        if (phoneNumber != null && phoneNumber != user.phoneNumber) {
            user.phoneNumber = phoneNumber;
        }

        if (address != null && address != user.address) {
            user.address = address;
        }

        if (roleId != null && roleId != user.roleId) {
            const role = await Role.findById(roleId);
            if (!role) {
                throw new Error("RoleId is invalid");
            }
            user.roleId = role;
        }
        user.save();

        return { user, msg: "Update user successfully." }
    }
}
