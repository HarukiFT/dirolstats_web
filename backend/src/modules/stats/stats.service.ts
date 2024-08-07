import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { LogDocument } from './schemas/log.schema';
import mongoose, { Model } from 'mongoose';
import clothPipeline from './aggregations/cloth.pipeline';
import { ConfigService } from '@nestjs/config';
import promoPipeline from './aggregations/promo.pipeline';
import { Skin } from './schemas/skin.schema';
import skinPipeline from './aggregations/skin.pipeline';
import joinPipeline from './aggregations/join.pipeline';

@Injectable()
export class StatsService {
    #targetProject: mongoose.mongo.BSON.ObjectId

    constructor(@InjectModel('Log', 'main') private readonly logModel: Model<LogDocument>, @InjectModel('Skin', 'additional') private readonly skinModel: Model<Skin>, configService: ConfigService) {
        this.#targetProject = mongoose.Types.ObjectId.createFromHexString(configService.getOrThrow<string>("TARGET_PROJECT"))
    }

    async getCloth(from: Date, due: Date) {
        const pipeline = clothPipeline(from, due, this.#targetProject)
        const result = await this.logModel.aggregate(pipeline)

        return result
    }

    async getPromo(from: Date, due: Date) {
        const pipeline = promoPipeline(from, due, this.#targetProject)
        const result = await this.logModel.aggregate(pipeline)

        return result
    }

    async getJoins(from: Date, due: Date) {
        const pipeline = joinPipeline(from, due, this.#targetProject)
        const result = await this.logModel.aggregate(pipeline)

        return result
    }
    
    async getSkins(from: Date, due: Date) {
        const skinDocuments = await this.logModel.find({
            project: this.#targetProject,
            timestamp: {
                $gte: from,
                $lte: due
            },
            action: 'promo',
            type: 'skin'
        })

        for (let skinDocument of skinDocuments) {
            if (!skinDocument.skin) {
                const skinData = await this.skinModel.findOne({
                    promo: skinDocument.promo
                })!

                await this.logModel.updateOne({_id: skinDocument._id}, {$set: {
                    skin: skinData.skin
                }})
            }
        }

        const pipeline = skinPipeline(from, due, this.#targetProject)
        const result = await this.logModel.aggregate(pipeline)

        return result
    }
}