import { Controller, Post ,Body, UsePipes, ValidationPipe, Get, Param, HttpException, Patch, Delete, Req} from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./DTO/CreayeUser.dto";
import mongoose from "mongoose";
import { UpdateUserDto } from "./DTO/UpdateUser.dto";
import {Request} from "express"
@Controller("users")
export class userController{

    constructor( private userService: UserService){}
    @Post()
    @UsePipes(new ValidationPipe())
    createUser(@Body() createUserDto:CreateUserDto ){
        console.log(createUserDto);
        return this.userService.createUser(createUserDto);
    }
    @Get()
    async getAllUsers(){
        // return this.userService.getUsers();
        const query = this.userService.getUsers();
        const page: number = 1;
        const limit = 3;
        const total = await this.userService.count(query);
        const data = await query.skip((page - 1) * limit).limit(limit).exec();
        return {
        data,
        total,
        page,
        last_page: Math.ceil(total / limit)
        };
    }
    @Get('/spesific/user/:id')
   async getUser(@Param('id') id:string){
        const isValid = mongoose.Types.ObjectId.isValid(id);
        if(!isValid) throw new HttpException("User not found by id",404);
        const findUser = await this.userService.getUserById(id);
        if(!findUser) throw new HttpException('User not found by id ', 404);
        return findUser ; 
    }

    @Patch(':id')
    @UsePipes(new ValidationPipe())
    async updateUser(@Param('id') id: string, @Body() updateUserDto : UpdateUserDto){
        const isValid =  mongoose.Types.ObjectId.isValid(id);
        if(!isValid) throw new HttpException("invalid ID",404);
        const updateUser = await this.userService.updateUser(id,updateUserDto);
        if(!updateUser) throw new HttpException('User not found', 404);
        return updateUser ;
    }

    @Delete(':id')
    async deleteUser(@Param('id') id: string){
        const isValid =  mongoose.Types.ObjectId.isValid(id);
        if(!isValid) throw new HttpException("invalid ID",404);
        const deleteUser = await this.userService.deleteUser(id);
        if(!deleteUser) throw new HttpException('User not found', 404);
        return;
    }

    @Get('search')
    async getSearchUser(@Req() req: Request){
        console.log("search : $ "+req.query.s)
        let options = {};
        if(req.query.s){
            options = {
                $or:[
                    {username: new RegExp(req.query.s.toString(),'i')},
                    {role: new RegExp(req.query.s.toString(),'i')},
                    {dispalyName: new RegExp(req.query.s.toString(),'i')},

                ]
            }
        }
    
        const query = this.userService.find(options);

        const page: number = parseInt(req.query.page as any) || 1;
        const limit = 3;
        const total = await this.userService.count(options);
        const data = await query.skip((page - 1) * limit).limit(limit).exec();
        
        return {
        data,
        total,
        page,
        last_page: Math.ceil(total / limit)
        };
                
        
    }

}