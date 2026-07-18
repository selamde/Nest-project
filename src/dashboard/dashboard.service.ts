import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

export interface Summary{
    totalApplicants: number,
    pending: number,
    accepted: number,
    rejected: number,
    shortlited:number
}
@Injectable()
export class DashboardService {
    constructor(private readonly prisma:PrismaService){}

    async getSummary(): Promise<Summary>{

        const totalApplicants = await this.prisma.applicant.count({
           where:{
              deletedAt:null
           }
        });
     const pending = await this.prisma.applicant.count({
        where:{
            status: "PENDING",
            deletedAt: null
        }
       
    });

    const shortlited = await this.prisma.applicant.count({
        where:{
            status: "SHORTLISTED",
            deletedAt: null
        }
    }); 

    const rejected = await this.prisma.applicant.count({
        where:{
            status: "REJECTED",
            deletedAt:null
        }
    });

    const accepted = await this.prisma.applicant.count({
        where:{
            status: "ACCEPTED",
            deletedAt: null
        }
    });



    return {
        totalApplicants,
        shortlited,
        rejected,
        accepted,
        pending
    }

      
        
    }

  
}
