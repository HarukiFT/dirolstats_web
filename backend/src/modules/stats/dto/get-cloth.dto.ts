import { IsDateString } from "class-validator";

export class GetClothDto {
    @IsDateString()
    from: string

    @IsDateString()
    to: string
}