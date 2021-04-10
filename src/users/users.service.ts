import { Injectable } from '@nestjs/common';
import { User } from 'src/interfaces/user.interface';

@Injectable()
export class UsersService {

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

    getUsers() {
        return this.users;
    }

    getUser(uid: number) {
        return this.users.filter(user => user.uid === uid);
    }

    create(user: User) {
        this.users.push(user);
        return user;
    }

    delete(uid: number) {
        let idx = this.users.findIndex(user => user.uid === uid);
        if(idx != -1) {
            return this.users.splice(idx, 1);
        }
        return null;
    }

}
