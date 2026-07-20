import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
    constructor(private readonly prisma:PrismaService){}

   async login(dto:LoginDto){
        const user = await this.prisma.admin.findUnique({
            where:{email:dto.email}
        })
        if(!user){
            throw new Error("User not found!")

        }



return {message: `${dto.email} and ${dto.password}`}
    }

    getInfo(){
        return {message:"info"}
        
    }
}
