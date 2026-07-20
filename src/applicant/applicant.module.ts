import { Module } from '@nestjs/common';
import { ApplicantService } from './applicant.service';
import { ApplicantController } from './applicant.controller';
import { PrismaModule } from 'src/prisma/prisma.module';


@Module({
  imports: [
  
   
    
   PrismaModule],
  providers: [ApplicantService],
  controllers: [ApplicantController]
})
export class ApplicantModule {}
