import { LoginDto } from "src/DTO/login.dto";
import { auth } from "./auth.repository";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "src/schemas/user.schema";
import * as bcrypt from 'bcryptjs';
import { JwtService } from "@nestjs/jwt";


@Injectable()
export class ImpAuth implements auth{

    constructor(@InjectModel(User.name) private userModel: Model<User>,private jwtService: JwtService,){}

    async login(loginDto: LoginDto): Promise<{ token: string }> {
        const { username, password } = loginDto;
        const user = await this.userModel.findOne({ username })
        if(!user) {
        throw new UnauthorizedException('Invalid email or password')
        }
        // const isPasswordMatched = await bcrypt.compare(password, user.password)
        // if(!isPasswordMatched) {
        // throw new UnauthorizedException('Invalid email or password')
        // }
        const token = this.jwtService.sign({ jti: user._id , aud : user.role , sub : username });
            return { token };
        }
}