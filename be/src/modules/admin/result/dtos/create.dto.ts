import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsEmail, IsNumber, IsOptional, IsString, MinLength, MaxLength, IsArray, IsEnum, IsIn } from "class-validator";
import { USER_STATUS, USER_TYPE } from "src/helpers/helper";

export class CreateDto {

	@ApiProperty()
	@IsOptional()
	user_id?: number;

	@ApiProperty()
	question_id: number;

	@ApiProperty()
	@IsOptional()
	answer_id?: number;

	@ApiProperty()
	@IsString()
	content_result: string;

	// @ApiProperty()
	time: any = new Date();

	@ApiProperty()
	@IsOptional()
	point: number;

	created_at: any = new Date();
	updated_at: any = new Date();
}
