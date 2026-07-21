import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateApplicantDto } from './dto/create-applicant.dto';
import { UpdateApplicantDto } from './dto/update-applicant.dto';
import { UpdateNotesDto } from './dto/update-notes.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { PrismaService } from 'src/prisma/prisma.service';





@Injectable()
export class ApplicantService {
    constructor(private readonly prisma:PrismaService){}
    
// POST   /api/applicants
async createApplicants(dto:CreateApplicantDto){
   const applicant = await this.prisma.applicant.create({
    data:{ 

        fullName: dto.fullName,
        email: dto.email,
        phone:dto.phone,
        track: dto.track
    }
   })
   if(!applicant){
    return {message: "Error creating the user"}
   }
  return applicant
}
// GET    /api/applicants
async getAllApplicants(
    page,
    limit,
    name?:string){
    const applicants = await this.prisma.applicant.findMany({
     where: name? {
        deletedAt:null,
        fullName: {contains: name.toLowerCase(), 
            mode: "insensitive"
        },
     }:{}
    })
    if(!applicants){
         throw new NotFoundException("No applicants found")
    }
return applicants
}
// GET    /api/applicants/:id
async getSingleApplicant(id:string){
    const applicant = await this.prisma.applicant.findUnique({
        where:{
            deletedAt: null,
            id: id
        }
    })
    if(!applicant){
        throw new NotFoundException(`No applicants found with id: ${id}`)
    }


    return applicant

}
// PATCH  /api/applicants/:id
async updateApplicantData(id:string, dto:UpdateApplicantDto){

    const applicant = await this.prisma.applicant.findUnique({
        where:{
            id:id
        }
    })
    if(!applicant){
        throw new NotFoundException(`No applicant found with id: ${id}`)
    }

    const updateApplicant = await this.prisma.applicant.update({
        where:{
            id:id
        },
        data:{
            ...dto
        }
    })
    
    return updateApplicant
}
// DELETE /api/applicants/:id
async deleteApplicant(id:string){
      const  applicant = await this.prisma.applicant.findUnique({
        where:{
            id:id
        }
      })
      if(!applicant || applicant.deletedAt){
        throw new NotFoundException(`No applcants found with id: ${id}`)
      }
      const deleteApplicant = await this.prisma.applicant.update({
       where:{
        id:id
       },
       data:{
        deletedAt: new Date()
       }
      })
      if(!deleteApplicant){
        throw new Error("Failed to delete the applicant")
      }
    return {message: "Applicant deleted!"}
}
// PATCH  /api/applicants/:id/status
async updateApplicantStatus(id:string, dto:UpdateStatusDto){
    const applicant = await this.prisma.applicant.findUnique({
        where:{
            id:id
        }
    })
    if(!applicant){
        throw new NotFoundException(`NO applicant with id: ${id}`)
    }
   
    if(applicant.status === "REJECTED" && dto.status==="ACCEPTED"){
        throw new BadRequestException("Applicant can not be accepted after rejection!");
    }

     const updateStatus = await this.prisma.applicant.update({
        where:{
            id:id
        },
        data:{
       status: dto.status
        }
    })

    if(!updateStatus){
        throw new Error("Failed to update the status of the applicant!")
    }

    return {message: "updating applicant status"}
}

// PATCH  /api/applicants/:id/notes
async updatingApplicanNotes(id:string, dto:UpdateNotesDto){
    const applicant = await this.prisma.applicant.findUnique({
        where:{
            id:id
        }
    })
    if(!applicant){
        throw new NotFoundException(`NO applicant with id: ${id}`)
    }

    const updateNote = await this.prisma.applicant.update({
        where:{
            id:id
        },
        data:{
       notes: dto.notes
        }
    })

    if(!updateNote){
        throw new Error("Failed to update the applicant note!")
    }

    return {message: "updating applicant note"}
}

}
