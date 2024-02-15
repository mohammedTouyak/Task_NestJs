import { Type } from "class-transformer";
import { IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";
import { TacheDto } from "src/taches/DTO/tache.dto";

export class CreateUserDto{

    @IsNotEmpty()
    @IsString()
    username: string;
    @IsString()
    role: string;
    @IsString()
    @IsOptional()
    displayName?: string;

    @IsOptional()
    @ValidateNested()
    @Type(()=> TacheDto)
    tache?: TacheDto;

    @IsString()
    @IsOptional()
    password?: string;

}