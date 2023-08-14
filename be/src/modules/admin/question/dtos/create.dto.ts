import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsEmail, IsNumber, IsOptional, IsString, MinLength, MaxLength, IsArray, IsEnum, IsIn } from "class-validator";
import { USER_STATUS, USER_TYPE } from "src/helpers/helper";

export class CreateDto {

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	name: string;

	@ApiProperty()
	topic_id: number;

	@ApiProperty()
	@IsNotEmpty()
	content_question: string;

	@ApiProperty()
	@IsOptional()
	avatar?: string;

	created_at: any = new Date();
	updated_at: any = new Date();
}
