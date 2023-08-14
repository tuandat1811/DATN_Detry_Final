import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString, IsEmail, MinLength, MaxLength, IsArray, IsEnum, IsNotEmpty } from "class-validator";

export class UpdateDto {

	@ApiProperty()
	@IsOptional()
	@IsString()
	name: string;

	@ApiProperty()
	topic_id: number;

	@ApiProperty()
	@IsOptional()
	content_question?: string;

	@ApiProperty()
	@IsOptional()
	avatar?: string;

	updated_at: any = new Date();
}
