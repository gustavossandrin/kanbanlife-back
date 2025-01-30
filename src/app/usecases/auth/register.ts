import UseCase from "@/domain/contracts/usecase";
import { User } from "@/domain/entities/user.entity";
import { Either, left, right } from "@/domain/errors/either";
import EntityError from "@/domain/errors/entity-error";
import EmailAlreadyInUseError from "@/domain/errors/email-already-in-use";
import CreateUserMapper from "@/domain/mappers/user/create-user-mapper";
import UserRepository from "@/domain/repositories/user-repository";
import { RegisterInput } from "@/shared/inputs/auth/register-input";
import { Injectable } from "@nestjs/common";

@Injectable()
export default class Register implements UseCase<I, O>{
    constructor(
        private readonly userRepository: UserRepository
    ){}

    async execute(input: I): Promise<O> {
        const existingUser = await this.userRepository.findByEmail(input.email);
        if (existingUser) {
            return left(new EmailAlreadyInUseError(input.email));
        }

        const user = await new CreateUserMapper().map(input);
        const entityError = user.validate();

        if (entityError) {
            return left(entityError);
        }

        return right(await this.userRepository.save(user));
    }
}

type I = RegisterInput
type O = Either<EntityError | EmailAlreadyInUseError, User>