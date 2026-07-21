import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt'
import {JwtService} from "@nestjs/jwt"

@Injectable()
export class AuthService {
    constructor(private readonly prisma:PrismaService, private readonly jwt:JwtService){}

   async login(dto:LoginDto){
        const admin = await this.prisma.admin.findUnique({
            where:{email:dto.email}
        })
        if(!admin){
            throw new Error("User not found!")

        }

        const isMatch = await bcrypt.compare(dto.password, admin.password);
        if(!isMatch){
            throw new Error("Invalid password")
        }

        const payload ={
            sub:admin.id,
            email:admin.email

        }

        const token = this.jwt.sign(payload)

    return {access_token: token}
    }

    
}
