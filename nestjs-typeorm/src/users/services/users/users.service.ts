import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/typeorm/entities/Posts';
import { Profile } from 'src/typeorm/entities/Proflie';
import { User } from 'src/typeorm/entities/User';
import { CreateUserParams, CreateUserPostsParams, CreateUserProfileParams, UpdateUserParams } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

    constructor
    (
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Profile) private profileRepository: Repository<Profile>,
        @InjectRepository(Post) private postRepository: Repository<Post>
    )
        
    {
        
    }

    findUsers(){
        return this.userRepository.find({ relations: ['profile']})
    }

    createUser(userDetails: CreateUserParams){
        const newUser = this.userRepository.create({
            ...userDetails,
            createdAt: new Date()
        });

        this.userRepository.save(newUser)
    }


    updateUser(id:number, updateUsersDetail: UpdateUserParams){
        return this.userRepository.update({id}, {
            ...updateUsersDetail
        })
    }


    deleteUserByIdeUser(id:number) {
        return this.userRepository.delete({id})
    }

    async createUserProfile(id:number, createUserProfilDetails : CreateUserProfileParams){
        const user = await this.userRepository.findOneBy({id})

        if (!user) {
            throw new HttpException('User not found', HttpStatus.BAD_REQUEST)
        }

        const newProfile = this.profileRepository.create({...createUserProfilDetails})

        const savedProfile = await this.profileRepository.save(newProfile)

        user.profile = savedProfile

        return this.userRepository.save(user)
    }


    async createUserPosts(id, createUserPostsDetail: CreateUserPostsParams){

        const user = await this.userRepository.findOneBy({id})

        if (!user) {
            throw new HttpException('User not found', HttpStatus.BAD_REQUEST)
        }

        const newPost = this.postRepository.create({...createUserPostsDetail, user})

        return this.postRepository.save(newPost)


    }   
}
