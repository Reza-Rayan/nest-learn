import { Module } from '@nestjs/common';
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { PrismaModule } from "prisma/prisma.module";
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from "./jwt.strategy";
import { LocalStrategy } from "./local.strategy";

@Module({
  providers: [AuthService, LocalStrategy, JwtStrategy],
  imports: [PrismaModule, PassportModule, JwtModule.register({
    secret: "321@#dEDCFSA12354)dsdwqQQW",
    signOptions: {
      expiresIn: "1d"
    }
  })],
  controllers: [AuthController],
})
export class AuthModule { }
