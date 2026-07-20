import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ApiTags } from '@nestjs/swagger';

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
@Get('me')
getInfo(){
    return this.auth.getInfo()
}

}
