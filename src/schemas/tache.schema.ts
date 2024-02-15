import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Tache{
    @Prop({ required : true})
    name: string;

    @Prop({ required : false})
    tag: string;

    @Prop({ required : false})
    description: string;

    @Prop({ required : false})
    userId: string;

}

export const TacheSchema = SchemaFactory.createForClass(Tache);