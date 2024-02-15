import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";//pour unjecter mongoose model
import { Model } from "mongoose";
import { User } from "src/schemas/user.schema";
import { CreateUserDto } from "./DTO/CreayeUser.dto";
import { UpdateUserDto } from "./DTO/UpdateUser.dto";
import { Tache, TacheSchema } from "src/schemas/tache.schema";

@Injectable()

export class UserService {
    constructor( @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Tache.name) private tacheModel: Model<Tache>){}
    
   async createUser(createUserDto : CreateUserDto){
      
            const newUser = await new this.userModel(createUserDto);
            return newUser.save();
       
    }

    getUsers(){
        return this.userModel.find().populate('tache');
    }
    find(option){
        return this.userModel.find(option).populate('tache');
    }
    getUserById(id: String){
        return this.userModel.findById(id).populate('tache');//pour afficher objer tache sous form de json
    }

    updateUser(id: string , updateUserDto: UpdateUserDto){
       return this.userModel.findByIdAndUpdate(id,updateUserDto,{new:true});
    }

    deleteUser(id: string){
        return this.userModel.findByIdAndDelete(id);
    }
    count(options){
        return this.userModel.countDocuments(options).exec();

    }
}