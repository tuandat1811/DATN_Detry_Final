import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class RegisterAdminDto {

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	name: string;

	@ApiProperty()
	@IsOptional()
	@IsEmail()
	username: string;

	@ApiProperty()
	@IsOptional()
	@IsEmail()
	email: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	@MinLength(6)
	@MaxLength(30)
	password: string;

	created_at: any = new Date();
	updated_at: any = new Date();
}
