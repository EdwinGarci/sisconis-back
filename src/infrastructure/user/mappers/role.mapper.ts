import { Role } from '@domain/user/entities/user.entity';
import { roles } from '@prisma/client';

export class RoleMapper {
    public static toPrisma(role: Role): roles {
        return role as unknown as roles;
    }

    public static toEntity(role: roles): Role {
        return role as unknown as Role;
    }
}
