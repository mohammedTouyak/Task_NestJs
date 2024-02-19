import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Tache{
    [x: string]: any;
    @Prop({ required : true})
    name: string;

    @Prop({ required : false})
    tag: string;

    @Prop({ required : false})
    description: string;

    @Prop({ required : false})
    userId: string;

    @Prop({ required : false})
    username: string;

    @Prop({ required : false})
    state: string;
}

export const TacheSchema = SchemaFactory.createForClass(Tache);