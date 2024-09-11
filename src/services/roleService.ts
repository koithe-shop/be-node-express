import { Role, IRole } from '../models/roleModel';

export class RoleService {
    // Lấy tất cả role
    static async getAllRoles() {
        return Role.find(); // Lấy tất cả role
    }

    // Tạo một role mới
    static async createRole(roleData: IRole) {
        const newRole = new Role(roleData);
        await newRole.save();
        return newRole;
    }

}
