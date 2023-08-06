import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsEmail, IsNumber, IsOptional, IsString, MinLength, MaxLength, IsArray, IsEnum, IsIn } from "class-validator";
import { USER_STATUS, USER_TYPE } from "src/helpers/helper";

export class CreateUserDto {

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	name: string;

	@ApiProperty()
	@IsOptional()
	@IsEmail()
	email?: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	username: string;

	@ApiProperty()
	@IsOptional()
	@IsString()
	@MinLength(10)
	@MaxLength(12)
	phone?: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	@MinLength(6)
	@MaxLength(30)
	password: string;

	@ApiProperty()
	@IsOptional()
	@IsEnum(USER_TYPE, { each: true })
	type?: string;

	@ApiProperty()
	@IsOptional()
	@IsEnum(USER_STATUS, { each: true })
	status: string;

	@ApiProperty()
	@IsOptional()
	company_id?: number;

	@ApiProperty()
	@IsOptional()
	avatar?: string;

	created_at: any = new Date();
	updated_at: any = new Date();
}
