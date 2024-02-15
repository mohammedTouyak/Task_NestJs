import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Tache, TacheSchema } from "src/schemas/tache.schema";
import { TacheController } from "./tahe.controller";
import { tacheService } from "./tache.service";
import { User, UserSchema } from "src/schemas/user.schema";
import { Tache2, Tache2Schema } from "src/schemas/tache2.schema";


@Module({
    imports:[
        MongooseModule.forFeature([
            { name : Tache.name, schema: TacheSchema },
            { name : User.name, schema: UserSchema },
            { name : Tache2.name, schema: Tache2Schema },
        ]),
    ],
    controllers : [TacheController],
    providers: [tacheService],
})
export class TacheModule{}