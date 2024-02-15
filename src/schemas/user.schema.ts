import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Tache } from "./tache.schema";

@Schema()
export class User {
toObject(arg0: { versionKey: boolean; }) {
    throw new Error("Method not implemented.");
}
@Prop({ unique: true, required: true })
username: string;
@Prop({ required: false })
displayName?: string;
@Prop({ required: true })
role: string;
@Prop({ required: false })
uriImg?: string;

@Prop({ type: [{type : mongoose.Schema.Types.ObjectId, ref: 'Tache'} ]})
tache?: Tache[];

@Prop()
password: string;
}
export const UserSchema = SchemaFactory.createForClass(User);