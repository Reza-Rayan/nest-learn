import { Body, Controller, Post } from '@nestjs/common';
import { AuthDto } from "./dtos/auth.dto";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post("/register")
    async register(@Body() body: AuthDto) {
        const user = await this.authService.register(body);

        return user;
    }

    @Post("login")
    login() {
        return 'login';
    }
}
