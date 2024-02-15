import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserRepositoryImp } from 'src/Repository/ImpUser.repositpry';
import { UsersService } from 'src/businessLayer/user.service';
import { usersController } from 'src/controllers/user.controller';
import { Tache, TacheSchema } from 'src/schemas/tache.schema';
import { User, UserSchema } from 'src/schemas/user.schema';

@Module({

    imports: [
      
        MongooseModule.forFeature([{name: User.name , schema: UserSchema}]),
        MongooseModule.forFeature([{name: Tache.name , schema: TacheSchema}]),


    ],
    controllers: [usersController],
    providers: [UsersService , UserRepositoryImp],

})
export class UsersModule {}
