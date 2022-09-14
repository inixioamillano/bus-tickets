import { isStringObject } from "util/types";
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';


export class LoginDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    password: string;
}