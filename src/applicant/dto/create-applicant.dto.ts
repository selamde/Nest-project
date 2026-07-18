import { Track } from "@prisma/client"
import { IsEmail, IsEnum, IsOptional, IsString } from "class-validator"


export class CreateApplicantDto{
    @IsString()
    fullName: String

    @IsEmail()
    email: string

    @IsOptional()
    @IsString()
    phone?: String

    @IsEnum(Track)
    track: Track

}