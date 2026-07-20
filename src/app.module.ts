import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ApplicantModule } from './applicant/applicant.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { AuthModule } from './auth/auth.module';
import {ConfigModule} from "@nestjs/config"


@Module({
  imports: [
    
    ConfigModule.forRoot({
      isGlobal:true
    })
    ,PrismaModule, ApplicantModule, DashboardModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
