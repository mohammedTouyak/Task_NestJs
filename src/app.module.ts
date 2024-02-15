import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';//la connexion à la base de données, la définition de schémas et la création de modèles
import { UserModule } from './user/user.module';
import { TacheModule } from './taches/taches.module';
import { AuthController } from './controllers/auth/auth.controller';
import { AuthService } from './businessLayer/auth.service';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/auth/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot("mongodb+srv://mohammedtouyak:2211@cluster0.e1chebt.mongodb.net/nest_mongpdb"),
    UserModule,
    TacheModule,
    AuthModule,
    UsersModule
  ],

})
export class AppModule {}
 