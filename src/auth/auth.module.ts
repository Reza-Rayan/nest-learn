import { Module } from '@nestjs/common';
import { PrismaModule } from "prisma/prisma.module";
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from "./local.strategy";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { env } from "process";

@Module({
  imports: [PrismaModule, PassportModule, JwtModule.register({
    secret: "321@#dEDCFSA12354)dsdwqQQW",
    signOptions: {
      expiresIn: "1d"
    }
  })],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy]
})
export class AuthModule { }
