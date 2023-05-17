import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CreateUserDto } from 'src/dtos/CreateUser.dto';
import { CreateUserPostsDto } from 'src/dtos/CreateUserPosts.dto';
import { CreateUserProfileDto } from 'src/dtos/CreateUserProfile.dto';
import { UpdteUserDto } from 'src/dtos/UpdateUser.dto';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService){

    }

    @Get()
    async getUsers(){
        const users = await this.usersService.findUsers()
        return users
    }

    @Post()
    createUser(@Body() createUserDto: CreateUserDto){
        return this.usersService.createUser(createUserDto)
    }

    @Put(':id')
    async updateUser(@Param('id', ParseIntPipe) id:number, @Body() updateUserDto : UpdteUserDto){
        await this.usersService.updateUser(id,updateUserDto)
    }

    @Delete(':id')
    async deleteUserById(@Param('id', ParseIntPipe) id:number){
        await this.usersService.deleteUserByIdeUser(id)
    }


    @Post(':id/profiles')
    createUserProfile(@Body() createUserProfileDto: CreateUserProfileDto, @Param('id', ParseIntPipe) id:number){
        return this.usersService.createUserProfile(id, {...createUserProfileDto})
        
    }


    @Post(':id/posts')
    createUserPost(@Param('id', ParseIntPipe) id:number, @Body() createUserPostDto : CreateUserPostsDto){
        return this.usersService.createUserPosts(id, {...createUserPostDto})
    }
}
