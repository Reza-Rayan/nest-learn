import { Injectable } from '@nestjs/common';
import { AuthDto } from "./dtos/auth.dto";
import { PrismaService } from "prisma/prisma.service";
import * as bcrypt from "bcrypt";

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
    async login(body: AuthDto) { }
    // End Here
}
