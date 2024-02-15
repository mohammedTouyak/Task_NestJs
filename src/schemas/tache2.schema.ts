import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Tache2{
    @Prop({ required : true})
    name: string;

    @Prop({ required : false})
    tag: string;

    @Prop({ required : false})
    description: string;

    @Prop({ required : false})
    userId: string;

}

export const Tache2Schema = SchemaFactory.createForClass(Tache2);