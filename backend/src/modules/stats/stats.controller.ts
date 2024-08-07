import { Controller, Get, Query } from '@nestjs/common';
import { GetClothDto } from './dto/get-cloth.dto';
import { StatsService } from './stats.service';

@Controller('stats')
export class StatsController {
    constructor(private statsService: StatsService) {}

    @Get('/cloth')
    async getCloth(@Query() query: GetClothDto) {
        const fromDate = new Date(query.from)
        const toDate = new Date(query.to)

        return await this.statsService.getCloth(fromDate, toDate)
    }

    @Get('/promo')
    async getPromo(@Query() query: GetClothDto) {
        const fromDate = new Date(query.from)
        const toDate = new Date(query.to)

        return await this.statsService.getPromo(fromDate, toDate)
    }

    @Get('/skins')
    async getSkins(@Query() query: GetClothDto) {
        const fromDate = new Date(query.from)
        const toDate = new Date(query.to)

        return await this.statsService.getSkins(fromDate, toDate)
    }
    
    @Get('/join')
    async getJoins(@Query() query: GetClothDto) {
        const fromDate = new Date(query.from)
        const toDate = new Date(query.to)

        return await this.statsService.getJoins(fromDate, toDate)
    }
}