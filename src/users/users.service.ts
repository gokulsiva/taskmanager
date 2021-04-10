import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/dto/create.user.dto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UsersService {

    /*
    private readonly users: User[] = [
        {
            uid: 1,
            email: 'u1@test.com',
            password: 'password'
        },
        {
            uid: 2,
            email: 'u1@test.com',
            password: 'password'
        },
        {
            uid: 3,
            email: 'u1@test.com',
            password: 'password'
        },
        {
            uid: 4,
            email: 'u1@test.com',
            password: 'password'
        },
    ];
    */

    constructor(
        @InjectRepository(UserRepository)
        private readonly userRepository: UserRepository
        ) {}

    async getUsers() {
        const users = await this.userRepository.find();
        return users;
    }

    async getUser(uid: number) {
        const user = await this.userRepository.findOne({uid});
        return user;
    }

    async getUserByEmailAndPassword(email: string, password: string) {
        const user = await this.userRepository.findOne({
            where: {
                email,
                password
            }
        });
        return user;
    }

    async getUserWithTasks(uid: number) {
        const user = await this.userRepository.findOne({
            where: {
                uid
            },
            relations: ['tasks']
        });
        return user;
    }

    async create(user: CreateUserDto) {
        const userInstance = new User();
        userInstance.email = user.email;
        userInstance.password = user.password;
        userInstance.tasks = [];
        return await this.userRepository.save(userInstance);
    }

    async delete(uid: number) {
        await this.userRepository.delete({uid});
        return;
    }

}
