import { Controller, Post ,Body, UsePipes, ValidationPipe, Get, Param, HttpException, Patch, Delete, Req, Query} from "@nestjs/common";
import mongoose from "mongoose";
import { CreateTacheDTO } from "src/DTO/createTache.dto";

import { TachesService } from "src/businessLayer/tache.service";
import { TacheDto } from "src/taches/DTO/tache.dto";


@Controller("gestion_taches/taches")
export class TachesController{
constructor(private tacheService:TachesService){}
    @Get()
    async getAllTasks(): Promise<TacheDto[]>{
            return  this.tacheService.findAll();
    }

    @Delete(':id')
    async deleteTache(@Param('id') id: string){
        const isValid =  mongoose.Types.ObjectId.isValid(id);
        if(!isValid) throw new HttpException("invalid ID",404);
        const deleteTache = await this.tacheService.deleteTache(id);
        if(!deleteTache) throw new HttpException('User not found', 404);
        return;
    }

    
    @Post('create')
    @UsePipes(new ValidationPipe())
    createtache(@Body() createTacheDto: CreateTacheDTO){
       return  this.tacheService.createTache(createTacheDto);
    }

    @Patch(':id/state')
    async updateState(@Param('id') documentId: string, @Body('state') newState: string) {
        return this.tacheService.stateChange(documentId, newState);
    }

}