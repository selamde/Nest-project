import { Injectable } from '@nestjs/common';
import { CreateApplicantDto } from './dto/create-applicant.dto';
import { UpdateApplicantDto } from './dto/update-applicant.dto';
import { UpdateNotesDto } from './dto/update-notes.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class ApplicantService {
    constructor(private readonly prisma:Prisma){}
    
// POST   /api/applicants
createApplicants(dto:CreateApplicantDto){
  return {message: "Creating Applicant"}
}
// GET    /api/applicants
getAllApplicants(){
return {message: "Getting app applicants"}
}
// GET    /api/applicants/:id
getSingleApplicant(id:string){
    return {message: "getting a single applicant"}

}
// PATCH  /api/applicants/:id
updateApplicantData(id:string, dto:UpdateApplicantDto){
    return {message: "Updating the applicant data"}
}
// DELETE /api/applicants/:id
deleteApplicant(id:string){
    return {message: "Deleting the applicant"}
}
// PATCH  /api/applicants/:id/status
updateApplicantStatus(id:string, dto:UpdateStatusDto){
    return {message: "updating applicant status"}
}
// PATCH  /api/applicants/:id/notes
updatingApplicanNotes(id:string, dto:UpdateNotesDto){
    return {message: "updating applicant note"}
}

}
