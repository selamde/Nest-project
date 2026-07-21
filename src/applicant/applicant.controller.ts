import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApplicantService } from './applicant.service';
import { CreateApplicantDto } from './dto/create-applicant.dto';
import { UpdateApplicantDto } from './dto/update-applicant.dto';
import { UpdateNotesDto } from './dto/update-notes.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('applicant')
@ApiQuery({
    name:'name',
    required:false
})
@Controller('applicant')

export class ApplicantController {
    constructor(private readonly applicantService:ApplicantService){}
      
// POST   /api/applicants
@UseGuards(JwtAuthGuard)
@Post()
    createApplicants(@Body() createApplicantDto: CreateApplicantDto){
       return this.applicantService.createApplicants(createApplicantDto)
    }
// GET    /api/applicants
@UseGuards(JwtAuthGuard)
@Get()
    getAllApplicants(
        @Query('page') page='1',
        @Query('limit') limit='10',
        @Query('name') name?:string){
        return this.applicantService.getAllApplicants(+page, +limit, name)
}
// GET    /api/applicants/:id
@UseGuards(JwtAuthGuard)
@Get(':id')
getSignleApplicant(@Param('id') id:string){
    return this.applicantService.getSingleApplicant(id)

}
// PATCH  /api/applicants/:id
@UseGuards(JwtAuthGuard)
@Patch(':id')
updateApplicantData(@Param('id') id:string, @Body() updateDto: UpdateApplicantDto){
    return this.applicantService.updateApplicantData(id, updateDto)
}
// DELETE /api/applicants/:id
@UseGuards(JwtAuthGuard)
@Delete(':id')
deleteApplicant(@Param('id') id:string){
    return this.applicantService.deleteApplicant(id)
}

// PATCH  /api/applicants/:id/status
@UseGuards(JwtAuthGuard)
@Patch(':id/status')
updateApplicantStatus(@Param('id') id:string, @Body() updateStatus:UpdateStatusDto){
    return this.applicantService.updateApplicantStatus(id, updateStatus)
}
// PATCH  /api/applicants/:id/notes
@UseGuards(JwtAuthGuard)
@Patch(':id/notes')
updatetheApplicantNotes(@Param('id') id:string, @Body() updateNotes:UpdateNotesDto){
    return this.applicantService.updatingApplicanNotes(id, updateNotes)
}



}
