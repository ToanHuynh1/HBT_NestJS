import { CreateUserDto } from './dto/create-user.dto';
import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
    private Users: User[] = [
        {id: 0, name: 'HBT'}, 
        {id: 1, name: 'Nest JS'}
    ]

    findAll(name?:string): User[]{

        if (name)
        {
            return this.Users.filter(user => user.name === name)
        }
        return this.Users
    }

    findById(userId: number): User{
        return this.Users.find(user => user.id === userId)
    }

    createUser(createUserDto: CreateUserDto): User {
        const newUser = {id: Date.now(), ...createUserDto}

        this.Users.push(newUser)

        return newUser
    }
}
