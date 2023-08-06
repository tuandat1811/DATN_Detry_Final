import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateDto {

	@ApiProperty()
	@IsOptional()
	question_id: number;

	@ApiProperty()
	@IsOptional()
	answer_id?: number;

	@ApiProperty()
	@IsString()
	@IsOptional()
	content_result: string;

	// @ApiProperty()
	// @IsOptional()
	time: any = new Date();

	@ApiProperty()
	@IsOptional()
	point?: number;

	updated_at: any = new Date();
}
