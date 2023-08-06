import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString, IsEmail, MinLength, MaxLength, IsArray, IsEnum } from "class-validator";
import { USER_STATUS, USER_TYPE } from "src/helpers/helper";

export class UpdateUserDto {

	@ApiProperty()
	@IsOptional()
	@IsString()
	name?: string;

	@ApiProperty()
	@IsEmail()
	@IsOptional()
	@IsString()
	email?: string;

	@ApiProperty()
	@IsOptional()
	@IsString()
	@MinLength(6)
	@MaxLength(30)
	password?: string;

	@ApiProperty()
	@IsOptional()
	@MinLength(10)
	@MaxLength(12)
	@IsString()
	phone?: string;

	@ApiProperty()
	@IsOptional()
	@IsEnum(USER_TYPE, { each: true })
	type?: string;

	@ApiProperty()
	@IsOptional()
	// @IsIn([USER_STATUS.ACTIVE, ])
	@IsEnum(USER_STATUS, { each: true })
	status?: string;

	@ApiProperty()
	@IsOptional()
	company_id?: number;

	@ApiProperty()
	@IsOptional()
	avatar?: string;
	updated_at?: any = new Date();
}
