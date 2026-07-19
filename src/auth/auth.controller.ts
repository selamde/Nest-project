import { Controller, Get, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {

//     POST   /api/auth/login
@Post('login')
login(){
    return {message: "login"}
}

// GET    /api/auth/me
@Get('me')
getInfo(){
    return {message: "Info"}
}

}
