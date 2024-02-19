import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { TacheRepositoryImp } from "src/Repository/ImpTache.repository";
import { TachesService } from "src/businessLayer/tache.service";
import { TachesController } from "src/controllers/tache.controller";
import { Tache, TacheSchema } from "src/schemas/tache.schema";

import { User, UserSchema } from "src/schemas/user.schema";


@Module({
    imports:[
        MongooseModule.forFeature([
            { name : Tache.name, schema: TacheSchema },
            { name : User.name, schema: UserSchema },

        ]),
    ],
    controllers : [TachesController],
    providers: [TachesService, TacheRepositoryImp],
})
export class TachesModule{}