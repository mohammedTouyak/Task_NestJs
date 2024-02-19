import { IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateTacheDTO{

    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    name: string;
    @IsOptional()
    @IsString()
    state: string;
    @IsString()
    @IsOptional()
    description?: string;
    @IsString()
    @IsNotEmpty()
    username: string;
}