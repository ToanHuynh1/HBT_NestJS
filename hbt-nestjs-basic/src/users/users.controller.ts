import { CreateUserDto } from './dto/create-user.dto';
import { Body, Controller, Get, NotFoundException, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { query } from 'express';

@ApiTags('user')
@Controller('users')
export class UsersController {

    constructor(private userService : UsersService){
        
    }


    @ApiOkResponse({type: User, isArray: true})
    @ApiNotFoundResponse()
    @ApiQuery({name: 'name', required: false})
    @Get()
    getUsers(@Query('name') name:string) : User[] {
        return this.userService.findAll(name)
    }

    @ApiOkResponse({type: User, description: 'the user'})
    @Get(':id')
    getUserById(@Param('id', ParseIntPipe) id: number) : User {

        const user = this.userService.findById(id)
        
        if (!user){
            throw new NotFoundException()
        }

        return user
    }

    @ApiCreatedResponse({type: User})
    @Post()
    @ApiBadRequestResponse()
    createUser(@Body() body:CreateUserDto) : User {
        return this.userService.createUser(body)
    }
}
