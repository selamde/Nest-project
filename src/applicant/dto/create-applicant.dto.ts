import { Track } from "@prisma/client"
import { IsEmail, IsEnum, IsOptional, IsString, MaxLength } from "class-validator"


export class CreateApplicantDto{
    @IsString()
    fullName: string

    @IsEmail()
    email: string

    @IsOptional()
    @IsString()
    phone?: string

    @IsEnum(Track)
    track: Track

    @IsOptional()
    @IsString()
    @MaxLength(100)
    note?:string

}