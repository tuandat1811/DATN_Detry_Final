import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class RegisterDto {

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	name: string;

	@ApiProperty()
	@IsNotEmpty()
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

	@ApiProperty()
	@IsOptional()
	company_id?: number;

	created_at: any = new Date();
	updated_at: any = new Date();
}
