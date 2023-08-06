import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsEmail, IsNumber, IsOptional, IsString, MinLength, MaxLength, IsArray, IsEnum, IsIn } from "class-validator";

export class CreateDto {

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	name: string;

	@ApiProperty()
	company_id: number;

	@ApiProperty()
	@IsOptional()
	avatar?: string;

	created_at: any = new Date();
	updated_at: any = new Date();
}
