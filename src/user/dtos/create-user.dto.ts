import { IsString, IsEmail, Length } from "class-validator";

export class CreateUserDto {
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    @Length(5, 20)
    password: string;

    @IsString()
    token: string;
}
