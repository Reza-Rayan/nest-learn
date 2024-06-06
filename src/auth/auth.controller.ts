import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { JwtService } from "@nestjs/jwt";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dtos/auth.dto";
import { LoginDto } from "./dtos/login.dto";
import { LocalAuthGuard } from "./local-auth.guard";

@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService, public jwtService: JwtService) { }

    @Post("/register")
    async register(@Body() body: AuthDto) {
        const user = await this.authService.register(body);

        return user;
    }

    @Post("/login")
    @UseGuards(LocalAuthGuard)
    login(@Body() body: LoginDto, @Request() req) {
        return {
            token: this.jwtService.sign({ id: req.user.id, email: req.user.email }),
            body
        };
    }

    @Get('profile')
    @UseGuards()
    profile() {
        return 'profile';
    }
}
