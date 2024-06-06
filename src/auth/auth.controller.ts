import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { JwtService } from "@nestjs/jwt";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dtos/auth.dto";
import { LoginDto } from "./dtos/login.dto";
import { LocalAuthGuard } from "./local-auth.guard";
import { JwtAuthGuard } from "./jwt-auth.guard";

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
    async login(@Body() body: LoginDto, @Request() req) {
        const token = this.jwtService.sign({ id: req.user.id, email: req.user.email });
        await this.authService.updateToken(req.user.id, token);
        return {
            token,
        };
    }

    @Get('profile')
    @UseGuards(JwtAuthGuard)
    @UseGuards()
    profile() {
        return 'profile';
    }

    @Post("logout")
    @UseGuards(JwtAuthGuard)
    async logout(@Request() req) {
        await this.authService.removeToken(req.user.id);
        return { message: "User logout" };
    }
}
