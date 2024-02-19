import { HttpException, Injectable } from "@nestjs/common";
import { tacheRepository } from "./tache.repository";

import { InjectModel } from "@nestjs/mongoose";
import { Tache } from "src/schemas/tache.schema";
import { Model } from "mongoose";
import { TacheDto } from "src/taches/DTO/tache.dto";
import { User } from "src/schemas/user.schema";
import { CreateTacheDTO } from "src/DTO/createTache.dto";



@Injectable()
export class TacheRepositoryImp implements tacheRepository{

    constructor(@InjectModel(Tache.name) private tacheModel : Model<Tache> ,
                @InjectModel(User.name) private userModel : Model<User> ){}


     private convert(tache: Tache): TacheDto {
        const json = tache.toObject({ versionKey: false });
        const id = json._id;
        delete json._id;
        return {
          ...json,
          id: String(id),
        };
      }
    
   async getAllTaches() :Promise<TacheDto[]>{
        const taches = await this.tacheModel.find();
         const newTaches = taches.map(tache => this.convert(tache));
        return newTaches;
    }
    deleteTache(id: string) {
        return this.tacheModel.findByIdAndDelete(id);
    }

   async stateChange(id: string, newState: string) : Promise<Tache> {
      return this.tacheModel.findByIdAndUpdate(id, { state: newState }, { new: true });
    }

    async createTache({username , ...createTacheDto}: CreateTacheDTO){
      const findUser = await this.userModel.findOne({username});
      if(!findUser) throw new HttpException('User not found',404);
      const newTache = new this.tacheModel(createTacheDto);
      newTache.username = username ;
      console.log("created tache  : "+JSON.stringify(createTacheDto))
      console.log("new tache username: "+newTache.username)
      console.log("new tache state: "+newTache.state)
      console.log("new tache name: "+newTache.name)

  
      const savedTache = await newTache.save();
      await findUser.updateOne({
          $push: {
              tache: savedTache._id,
          },
      });
      return savedTache;
  }


    
}