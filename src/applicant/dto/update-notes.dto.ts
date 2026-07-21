import { IsOptional, IsString, MaxLength } from "class-validator";


export class UpdateNotesDto{
    @IsOptional()
    @IsString()
    @MaxLength(1000)
    notes?: string
}