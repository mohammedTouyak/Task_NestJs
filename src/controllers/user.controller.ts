import { Controller, Post ,Body, UsePipes, ValidationPipe, Get, Param, HttpException, Patch, Delete, Req, Query} from "@nestjs/common";

import mongoose from "mongoose";
import {Request} from "express"
import { PaginatedDto } from "src/DTO/pagination.dto";
import { User } from "src/schemas/user.schema";
import { UsersService } from "src/businessLayer/user.service";
import { UserTache } from "src/DTO/userTache.dto";
@Controller("gestion_taches/users")
export class usersController{
constructor(private userService:UsersService){}
    @Get()
    async getAllUsers(@Query('page' )page: number ,@Query('limit') limit: number): Promise<PaginatedDto<User>>{
            return  this.userService.findAll(page,limit);
    }
    @Get('/taches/:id')
    async getTachesUser(@Param('id') id : string) : Promise<UserTache>{
        const isValid =  mongoose.Types.ObjectId.isValid(id);
        if(!isValid) throw new HttpException("invalid ID",404);
        const tachesUser = await this.userService.getTachesUser(id);
        if(!tachesUser) throw new HttpException('User not found', 404);
        return tachesUser;
    }

}