import { IsEmail, IsNotEmpty, isNotEmpty, IsString } from "class-validator";

export class LoginDto {

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;
}
