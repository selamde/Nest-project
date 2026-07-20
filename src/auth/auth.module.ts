import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import {ConfigModule, ConfigService} from '@nestjs/config'

@Module({
  imports:[
    ConfigModule,
   JwtModule.registerAsync({
    inject: [ConfigService],
    useFactory:(config: ConfigService)=>({
      secret: config.get<string>('JWT_SECRET'),
      signOptions:{
        expiresIn: config.get('JWT_EXPIERIN')
      }
      
    })
   }),
    PrismaModule],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
