import { Type } from "class-transformer";
import { IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";
import { TacheDto } from "src/taches/DTO/tache.dto";

export class UserTache{

    @IsNotEmpty()
    @IsString()
    username: string;

    @IsString()
    role: string;

    @IsOptional()
    @ValidateNested()
    @Type(()=> TacheDto)
    tache?: TacheDto;


}