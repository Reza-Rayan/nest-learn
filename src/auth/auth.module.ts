import { Module } from '@nestjs/common';
import { PrismaModule } from "prisma/prisma.module";
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from "./local.strategy";
import { PassportModule } from "@nestjs/passport";

@Module({
  imports: [PrismaModule, PassportModule],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy]
})
export class AuthModule { }
