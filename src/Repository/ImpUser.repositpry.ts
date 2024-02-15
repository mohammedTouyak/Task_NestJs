import { PaginatedDto } from "src/DTO/pagination.dto";
import { CreateUserDto } from "src/user/DTO/CreayeUser.dto";
import { UserRepository } from "./user.repository";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "src/schemas/user.schema";
import { Tache } from "src/schemas/tache.schema";
import { Model } from "mongoose";

@Injectable()
export class UserRepositoryImp implements UserRepository{

    constructor( @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Tache.name) private tacheModel: Model<Tache>){}


    // private convert(user: User): CreateUserDto {
    //     const json = user.toObject({ versionKey: false });
    //     const id = json._id;
    //     delete json._id;
    //     return {
    //       ...json,
    //       id: String(id),
    //     };
    //   }

    async findAll(page: number , limit: number): Promise<PaginatedDto<User>> {
        const users = await this.userModel.find().limit(limit).skip((page- 1) * limit).exec();
        const itemCount = await this.userModel.countDocuments();
        return new PaginatedDto<User>(users, page, limit, itemCount)
    }
    
}