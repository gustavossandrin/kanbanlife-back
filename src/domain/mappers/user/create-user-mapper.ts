import Mapper from "@/domain/contracts/mapper";
import { User } from "@/domain/entities/user.entity";
import { RegisterInput } from "@/shared/inputs/auth/register-input";
import * as bcrypt from 'bcrypt';

export default class CreateUserMapper implements Mapper<RegisterInput, User>{
    async map(input: RegisterInput): Promise<User> {
        const hashedPassword = await bcrypt.hash(input.password, 10);
        
        return new User(
            input.firstName,
            input.lastName,
            input.email,
            hashedPassword,
        );
    }
}