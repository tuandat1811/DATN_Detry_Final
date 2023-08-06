import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString, IsEmail, MinLength, MaxLength, IsArray, IsEnum, IsPhoneNumber } from "class-validator";
import { USER_STATUS, USER_TYPE } from "src/helpers/helper";

export class UpdateDto {

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
	@MinLength(10)
	@MaxLength(12)
	@IsString()
	phone?: string;

	@ApiProperty()
	@IsOptional()
	// @IsIn([USER_STATUS.ACTIVE, ])
	@IsEnum(USER_STATUS, { each: true })
	status?: string;

	@ApiProperty()
	@IsOptional()
	logo?: string;

	@ApiProperty()
	@IsOptional()
	avatar?: string;

	updated_at: any = new Date();
}
