import UseCase from "@/domain/contracts/usecase";
import { User } from "@/domain/entities/user.entity";
import { Either, left, right } from "@/domain/errors/either";
import EntityError from "@/domain/errors/entity-error";
import EmailAlreadyInUseError from "@/domain/errors/email-already-in-use";
import CreateUserMapper from "@/domain/mappers/user/create-user-mapper";
import UserRepository from "@/domain/repositories/user-repository";
import { RegisterInput } from "@/shared/inputs/auth/register-input";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "@/infra/persistence/prisma/prisma.service";

@Injectable()
export default class Register implements UseCase<I, O>{
    constructor(
        private readonly userRepository: UserRepository,
        private readonly prisma: PrismaService
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

        const savedUser = await this.userRepository.save(user);

        await this.prisma.project.create({
            data: {
                name: 'MyProject',
                userId: savedUser.id,
                columns: {
                    create: [
                        { name: 'To-do', maxTasks: 0, position: 0 },
                        { name: 'Do Today', maxTasks: 0, position: 1 },
                        { name: 'In Progress', maxTasks: 3, position: 2 },
                        { name: 'Done', maxTasks: 0, position: 3 }
                    ]
                }
            }
        });

        return right(savedUser);
    }
}

type I = RegisterInput
type O = Either<EntityError | EmailAlreadyInUseError, User>