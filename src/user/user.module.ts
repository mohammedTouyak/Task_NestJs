import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';//la connexion à la base de données, la définition de schémas et la création de modèles
import { User, UserSchema } from '../schemas/user.schema';
import { UserService } from './user.service';
import { userController } from './user.controller';
import { Tache, TacheSchema } from 'src/schemas/tache.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: User.name , schema: UserSchema},{name: Tache.name , schema: TacheSchema}])],
  controllers: [userController],
  providers: [
    UserService
  ],
})
export class UserModule {}
 