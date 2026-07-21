import { Status, Track } from "@prisma/client"
import { Type } from "class-transformer"
import { IsEnum, IsIn, IsInt, IsOptional, IsString } from "class-validator"


export class QueryApplicantDto{
@IsOptional()
@Type(()=> Number)
@IsInt()    
page?: number

@IsOptional()
@IsString()
@Type(()=> Number)
@IsInt()   
limit?: number

@IsOptional()
search?: string

@IsOptional()
@IsEnum(Status)
status?: Status

@IsOptional()
@IsEnum(Track)
track?: Track

@IsOptional()
@IsString()
sortBy?: string

@IsOptional()
@IsString()
order?: 'asc' | 'desc'
}