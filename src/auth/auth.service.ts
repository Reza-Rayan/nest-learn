import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthDto } from "./dtos/auth.dto";
import { PrismaService } from "prisma/prisma.service";
import * as bcrypt from "bcrypt";
import { LoginDto } from "./dtos/login.dto";

@Injectable()
export class AuthService {
    constructor(public prisma: PrismaService) { }

    // Register User
    async register(data: AuthDto) {
        const user = await this.prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: await bcrypt.hash(data.password, 12),
            },
            select: {
                name: true,
                email: true,
                createdAt: true
            }
        });

        return user;
    }
    // End Here

    // Login User
    async login(email: string, password: string) {
        const user = await this.prisma.user.findUnique({
            where: {
                email,
            }
        });

        if (!user) {
            throw new BadRequestException();
        }
        if (!await bcrypt.compare(password, user.password)) {
            throw new UnauthorizedException("");
        }
        return user;
    }
    // End Here
}
