import { Type } from "class-transformer";
import { IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";

export class LoginDto{

    @IsNotEmpty()
    @IsString()
    username: string;
    @IsString()
    role: string;
    @IsString()
    @IsOptional()
    password?: string;
}
