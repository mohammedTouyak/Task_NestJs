import { HttpException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Tache } from "src/schemas/tache.schema";
import { TacheDto } from "./DTO/tache.dto";
import { User } from "src/schemas/user.schema";
import { Tache2 } from "src/schemas/tache2.schema";

@Injectable()
export class tacheService{
    constructor(@InjectModel(Tache.name) private tacheModel: Model<Tache>,
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Tache2.name) private tache2Model: Model<Tache2>,){}


async createTache({userId , ...createTacheDto}: TacheDto){
    const findUser = await this.userModel.findById(userId);
    if(!findUser) throw new HttpException('User not found',404);
    const newTache = new this.tacheModel(createTacheDto);
    newTache.userId = userId ;
    console.log("new tache : "+newTache.userId)
    console.log("new tache : "+userId)

    const savedTache = await newTache.save();
    await findUser.updateOne({
        $push: {
            tache: savedTache._id,
        },
    });
    return savedTache;
}

getAllTaches(){
    return this.tacheModel.find();
}

getAllTaches2(){
    return this.tache2Model.find();
}


findTacheById(){}

}