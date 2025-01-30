import Mapper from "@/domain/contracts/mapper";
import { User } from "@/domain/entities/user.entity";
import { RegisterInput } from "@/shared/inputs/auth/register-input";

export default class CreateUserMapper implements Mapper<RegisterInput, User>{
    map(input: RegisterInput): User {
        return new User(
            input.firstName,
            input.lastName,
            input.email,
            input.password,
        );
        }
}