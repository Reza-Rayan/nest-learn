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

    // update token
    async updateToken(id: number, token: string) {
        const user = await this.prisma.user.update({
            where: {
                id
            },
            data: {
                token
            }
        });
        return token;
    }

    async validateUsrByToken(id: number) {
        const user = await this.prisma.user.findUnique({
            where: {
                id,
            }
        });

        if (!user || user.token === null) {
            throw new UnauthorizedException();
        }

        return user;
    }

    // Logout
    async removeToken(id: number) {
        const user = await this.prisma.user.update({
            where: {
                id
            },
            data: {
                token: null
            }
        });
        return 'Removed Token';
    }
}
