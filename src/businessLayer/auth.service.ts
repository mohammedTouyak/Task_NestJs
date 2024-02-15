import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LoginDto } from 'src/DTO/login.dto';
import { ImpAuth } from 'src/Repository/ImpAuth.repository';

@Injectable()
export class AuthService {

    constructor(private readonly authRepository: ImpAuth){}

   async login(loginDto: LoginDto): Promise<{ token: string }>{
        return await this.authRepository.login(loginDto);
    }
}
