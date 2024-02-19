import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";//pour unjecter mongoose model
import { Model } from "mongoose";
import { User } from "src/schemas/user.schema";

import { Tache, TacheSchema } from "src/schemas/tache.schema";
import { TacheDto } from "src/taches/DTO/tache.dto";
import { tacheRepository } from "src/Repository/tache.repository";
import { TacheRepositoryImp } from "src/Repository/ImpTache.repository";
import { CreateTacheDTO } from "src/DTO/createTache.dto";

@Injectable()
export class TachesService {
    
    constructor(private tacheRepository: TacheRepositoryImp){}
    


    async findAll(): Promise<TacheDto[]> {
            return await this.tacheRepository.getAllTaches();
    }

    deleteTache(id: string){
        return this.tacheRepository.deleteTache(id);
    }

    createTache(createTacheDto: CreateTacheDTO){
            return this.tacheRepository.createTache(createTacheDto);
    }
    async stateChange(id:string , state : string){
        return this.tacheRepository.stateChange(id, state);
    }
}