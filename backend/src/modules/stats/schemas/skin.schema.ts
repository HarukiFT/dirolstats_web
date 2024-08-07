import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";

@Schema({strict: false})
export class Skin {
    @Prop({type: String, required: true})
    promo: string

    @Prop({type: Number, required: true})
    claimed: number

    @Prop({type: String, required: true})
    skin: string
}

export type SkinDocument = Skin & Document
export const SkinSchema = SchemaFactory.createForClass(Skin)