import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString, IsEmail, MinLength, MaxLength, IsArray, IsEnum } from "class-validator";

export class UpdateDto {

	@ApiProperty()
	@IsString()
	name: string;

	@ApiProperty()
	@IsOptional()
	company_id?: number;

	@ApiProperty()
	@IsOptional()
	avatar?: string;

	created_at: any = new Date();
	updated_at: any = new Date();
}
