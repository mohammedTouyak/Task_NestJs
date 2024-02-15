import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { ImpAuth } from 'src/Repository/ImpAuth.repository';
import { AuthService } from 'src/businessLayer/auth.service';
import { AuthController } from 'src/controllers/auth/auth.controller';
import { User, UserSchema } from 'src/schemas/user.schema';

@Module({

    imports: [
        PassportModule.register({defaultStrategy: 'jwt'}),
        JwtModule.registerAsync({
            inject: [ConfigService],
            useFactory: (config: ConfigService)=> {
                return{
                    secret: config.get<string>("JWT_SECRET"),
                    signOptions: {
                        expiresIn: config.get<string | number>("JWT_EXPIRES"),
                    },
                };
            },

        }),
        MongooseModule.forFeature([{name: User.name , schema: UserSchema}]),

    ],
    controllers: [AuthController],
    providers: [AuthService , ImpAuth],

})
export class AuthModule {}
