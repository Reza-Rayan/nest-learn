import { IsString, IsEmail, Length, IsNotEmpty } from "class-validator";

export class AuthDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @Length(5, 20)
    password: string;
}
