import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsEmail, IsNumber, IsOptional, IsString, MinLength, MaxLength, IsArray, IsEnum, IsIn, IsPhoneNumber } from "class-validator";
import { USER_STATUS, USER_TYPE } from "src/helpers/helper";

export class CreateDto {

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	name: string;

	@ApiProperty()
	@IsOptional()
	@IsEmail()
	@IsNotEmpty()
	email: string;

	@ApiProperty()
	@IsOptional()
	@IsString()
	@MinLength(10)
	@MaxLength(12)
	phone?: string;

	@ApiProperty()
	@IsOptional()
	@IsEnum(USER_STATUS, { each: true })
	status: string;

	@ApiProperty()
	@IsOptional()
	logo?: string;

	@ApiProperty()
	@IsOptional()
	avatar?: string;

	created_at: any = new Date();
	updated_at: any = new Date();
}
