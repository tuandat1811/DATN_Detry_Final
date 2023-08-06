import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString, IsEmail, MinLength, MaxLength, IsArray, IsEnum, IsNotEmpty } from "class-validator";

export class UpdateDto {

	@ApiProperty()
	@IsOptional()
	user_id?: number;

	@ApiProperty()
	@IsOptional()
	question_id?: number;

	@ApiProperty()
	@IsOptional()
	content_answer: string;

	updated_at: any = new Date();
}
