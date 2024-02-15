import { Controller, Post ,Body, UsePipes, ValidationPipe, Get, Param, HttpException, Patch, Delete, Req, Query} from "@nestjs/common";

import mongoose from "mongoose";
import {Request} from "express"
import { PaginatedDto } from "src/DTO/pagination.dto";
import { User } from "src/schemas/user.schema";
import { UsersService } from "src/businessLayer/user.service";
@Controller("gestion_taches/users")
export class usersController{
constructor(private userService:UsersService){}
    @Get()
    async getAllUsers(@Query('page' )page: number ,@Query('limit') limit: number): Promise<PaginatedDto<User>>{
            return  this.userService.findAll(page,limit);
    }

}