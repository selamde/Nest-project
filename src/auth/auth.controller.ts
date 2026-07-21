import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from './jwt-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly auth:AuthService){}

//     POST   /api/auth/login
@Post('login')
login(@Body() dto:LoginDto ){
    return this.auth.login(dto)
}

// GET    /api/auth/me

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Get('me')
getInfo(@Req() req){
    return req.user
}

}
