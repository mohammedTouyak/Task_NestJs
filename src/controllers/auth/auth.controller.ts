import { Body, Controller, Get, Post } from '@nestjs/common';
import { LoginDto } from 'src/DTO/login.dto';
import { AuthService } from 'src/businessLayer/auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post('/login')
    login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
        return  this.authService.login(loginDto);
    }

}
