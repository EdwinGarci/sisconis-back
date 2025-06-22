import { UserEntity } from '@domain/user/entities/user.entity';
import { RoleMapper } from './role.mapper';
import { roles } from '@prisma/client';

interface RawUserData {
    id: number;
    name: string;
    lastname: string;
    username: string;
    password: string;
    document_number: string;
    role: roles;
}

export class UserMapper {
    public static toPrisma(user: UserEntity) {
        return {
            name: user.getName(),
            lastname: user.getLastname(),
            username: user.getUsername(),
            password: user.getPassword(),
            document_number: user.getDocumentNumber(),
            role: RoleMapper.toPrisma(user.getRole()),
        };
    }

    public static toEntity(raw: RawUserData) {
        const result = UserEntity.create({
            id: raw.id,
            name: raw.name,
            lastname: raw.lastname,
            username: raw.username,
            password: raw.password,
            documentNumber: raw.document_number,
            role: RoleMapper.toEntity(raw.role),
        });

        if (result.isFailure) {
            throw result.getError();
        }

        return result.getValue();
    }
}
