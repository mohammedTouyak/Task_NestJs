import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";//pour unjecter mongoose model
import { Model } from "mongoose";
import { User } from "src/schemas/user.schema";

import { Tache, TacheSchema } from "src/schemas/tache.schema";
import { CreateUserDto } from "src/user/DTO/CreayeUser.dto";
import { PaginatedDto } from "src/DTO/pagination.dto";
import { UserRepositoryImp } from "src/Repository/ImpUser.repositpry";

@Injectable()

export class UsersService {
    constructor( @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Tache.name) private tacheModel: Model<Tache>, private userRepository: UserRepositoryImp){}
    


    async findAll(page: number , limit: number): Promise<PaginatedDto<User>> {
            return await this.userRepository.findAll(page,limit);
    }


   async createUser(createUserDto : CreateUserDto){
            const newUser = await new this.userModel(createUserDto);
            return newUser.save();
       
    }

    getUsers(){
        return this.userModel.find().populate('tache');
    }
}