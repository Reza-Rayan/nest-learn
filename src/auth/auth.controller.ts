import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from "./auth.service";
import { AuthDto } from "./dtos/auth.dto";
import { LoginDto } from "./dtos/login.dto";
import { LocalAuthGuard } from "./local-auth.guard";

@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post("/register")
    async register(@Body() body: AuthDto) {
        const user = await this.authService.register(body);

        return user;
    }

    @Post("/login")
    @UseGuards(LocalAuthGuard)
    login(@Body() body: LoginDto, @Request() req) {
        return body;
    }
}
