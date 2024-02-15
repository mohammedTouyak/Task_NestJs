import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import {  TacheDto } from "./DTO/tache.dto";
import { tacheService } from "./tache.service";

@Controller('taches')
export class TacheController{

    constructor(private tacheService: tacheService){}

    @Post()
    @UsePipes(new ValidationPipe())
    createtache(@Body() createTacheDto: TacheDto){
       return  this.tacheService.createTache(createTacheDto);
    }

    @Get()
    getTaches(){
        return this.tacheService.getAllTaches();
    }

 
}