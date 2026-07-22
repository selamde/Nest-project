import { ApiPropertyOptional } from "@nestjs/swagger"
import { Status, Track } from "@prisma/client"
import { Type } from "class-transformer"
import { IsEnum, IsIn, IsInt, IsOptional, IsString } from "class-validator"


export class QueryApplicantDto{

@ApiPropertyOptional({
    description: "Page number",
    example:1,
    default:1

})    
@IsOptional()
@Type(()=> Number)
@IsInt()    
page?: number


@ApiPropertyOptional({
    description:"Page limit",
    example:1,
    default:1
})
@IsOptional()
@Type(()=> Number)
@IsInt()   
limit?: number

@ApiPropertyOptional({
    description:"Search by name or email"
})
@IsOptional()
search?: string



@ApiPropertyOptional({
    enum: Status,
    example:Status.PENDING
})
@IsOptional()
@IsEnum(Status)
status?: Status



@ApiPropertyOptional({
    enum: Track,
    example: Track.FRONTEND
})
@IsOptional()
@IsEnum(Track)
track?: Track


@ApiPropertyOptional({
    example:"createdAt"
})
@IsOptional()
@IsString()
sortBy?: string

@ApiPropertyOptional({
    enum:["asc", "desc"],
    example:"desc"
})
@IsOptional()
@IsString()
order?: 'asc' | 'desc'
}