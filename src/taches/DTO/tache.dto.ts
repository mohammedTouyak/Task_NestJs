import { IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

export class TacheDto{

    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    name: string;
    @IsOptional()
    @IsString()
    tag: string;
    @IsString()
    @IsOptional()
    description?: string;
    @IsString()
    @IsNotEmpty()
    userId: string;
}