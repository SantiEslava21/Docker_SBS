import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class UsersService {

    users: User[] = [];
    constructor(@InjectRepository(User) private userRepo: Repository<User>){}

    async findAll(){
        this.users = await this.userRepo.find();
        return this.users;
    }
}
