import { Controller, Post, Get, Put, Delete, Body, Param, Request, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { BadRequestException } from 'src/helpers/response/badRequest';
import * as _ from 'lodash';
import { BaseResponse, HTTP_STATUS, IPaging, USER_TYPE } from 'src/helpers/helper';
import { JwtGuard } from 'src/modules/auth/guards/jwt/jwt.guard';
import { RoleGuard } from 'src/modules/auth/guards/role/role.guard';
import { QuestionService } from './question.service';
import { CreateDto } from './dtos/create.dto';
import { UpdateDto } from './dtos/update.dto';

@Controller('questions')
@ApiTags('Admin Question')
export class QuestionController {
	constructor(private readonly questionService: QuestionService) { }

	@Post('')
	@UseGuards(JwtGuard,new RoleGuard([USER_TYPE.ADMIN, USER_TYPE.USER]))
	@ApiResponse({ status: 200, description: 'success' })
	async createData(
		@Request() req: any,
		@Body() formDto: CreateDto
	) {
		try {
			if (_.isEmpty(formDto)) {
				throw new BadRequestException({ code: 'F0001' });
			}
			const result = await this.questionService.createData(formDto, req.user);

			return BaseResponse(HTTP_STATUS.success, result, '', 'successfully');
		} catch (error) {
			console.log('e@createProduct----> ', error);
			return BaseResponse(error.status, error.response, error.code || 'E0001', error.message);
		}
	}



	@Put(':id')
	@UseGuards(JwtGuard,new RoleGuard([USER_TYPE.ADMIN, USER_TYPE.USER]))
	@HttpCode(HttpStatus.OK)
	@ApiResponse({ status: 200, description: 'success' })
	async updateById(
		@Param('id') id: number,
		@Request() req: any, 
		@Body() updateData: UpdateDto
		) {
		try {
			let condition: any = {};
			if(req.user.type != USER_TYPE.ADMIN) {
				condition.user_id = req.user.id;
			}
			const check = await this.questionService.getOneByCondition(condition);
			if (!check) return BaseResponse(HTTP_STATUS.fail, {}, 'E0001', 'Question does not exist');
			if (_.isEmpty(updateData)) throw new BadRequestException({ code: 'F0001' });
			else {
				return BaseResponse(HTTP_STATUS.success, await this.questionService.updateById(id, updateData), '', 'Updated successfully!');
			}
		} catch (e) {
			console.log('update user ---------------->', e.message);
			return BaseResponse(e.status, e.response, e.code || 'E0001', e.message);
		}
	}

	@Delete(':id')
	@UseGuards(JwtGuard,new RoleGuard([USER_TYPE.ADMIN, USER_TYPE.USER]))
	@HttpCode(HttpStatus.OK)
	@ApiResponse({ status: 200, description: 'success' })
	async deleteById(@Param('id') id: number) {
		try {
			const check = await this.questionService.getById(id);
			if (!check) {
				return BaseResponse(HTTP_STATUS.fail, {}, 'E0001', 'user does not exist');
			}

			return BaseResponse(HTTP_STATUS.success, await this.questionService.deleteById(id), '', 'Delete successfully!');

		} catch (e) {
			console.log('Delete user ---------------->', e.message);
			return BaseResponse(e.status, e.response, e.code || 'E0001', e.message);
		}
	}

	async buildFilter(@Request() req: any) {
		const filters = {
			id: req.query.id || null,
			topic_id: req.query.topic_id || null,
			name: req.query.name || null,
			user_id: req.user?.id || req.query.user_id || null
		};
		return filters;
	}

	@Get('')
	@HttpCode(HttpStatus.OK)
	@ApiResponse({ status: 200, description: 'success' })
	async getLists(@Request() req: any) {
		try {

			const filters = await this.buildFilter(req);
			const paging: IPaging = {
				page: req.query.page || 1,
				page_size: req.query.page_size || 20,
			};
			let responseData: any = await this.questionService.getLists(paging, filters);

			return BaseResponse(HTTP_STATUS.success, responseData, '', 'Successful');

		} catch (e) {
			console.log('UserController@getLists ---------->', e.message);
			return BaseResponse(e.status, e.response, e.code || 'E0001', e.message);
		}
	}

	@Get('/default-user')
	@UseGuards(JwtGuard)
	@HttpCode(HttpStatus.OK)
	@ApiResponse({ status: 200, description: 'success' })
	async getListsByDefaultUser(@Request() req: any) {
		try {
			
			const filters: any = await this.buildFilter(req);
			filters.user_id = req.user.id || null;
			const paging: IPaging = {
				page: req.query.page || 1,
				page_size: req.query.page_size || 20,
			};
			let responseData: any = await this.questionService.getLists(paging, filters, 1);

			return BaseResponse(HTTP_STATUS.success, responseData, '', 'Successful');

		} catch (e) {
			console.log('TopicController@getLists ---------->', e.message);
			return BaseResponse(e.status, e.response, e.code || 'E0001', e.message);
		}
	}

	@Get('/user')
	@UseGuards(JwtGuard, new RoleGuard([USER_TYPE.USER]))
	@HttpCode(HttpStatus.OK)
	@ApiResponse({ status: 200, description: 'success' })
	async getListsByUser(@Request() req: any) {
		try {
			
			const filters: any = await this.buildFilter(req);
			filters.user_id = req.user.type == USER_TYPE.USER && req.user.id || null;
			filters.company_id = req.user.type == USER_TYPE.USER && req.user.company_id || null;
			const paging: IPaging = {
				page: req.query.page || 1,
				page_size: req.query.page_size || 20,
			};
			let responseData: any = await this.questionService.getLists(paging, filters, 2);

			return BaseResponse(HTTP_STATUS.success, responseData, '', 'Successful');

		} catch (e) {
			console.log('TopicController@getLists ---------->', e.message);
			return BaseResponse(e.status, e.response, e.code || 'E0001', e.message);
		}
	}

	// @Get('/answers')
	// @UseGuards(JwtGuard)
	// @HttpCode(HttpStatus.OK)
	// @ApiResponse({ status: 200, description: 'success' })
	// async getListAnswers(@Request() req: any) {
	// 	try {
	// 		const filters = {
	// 			question_id: req.query.question_id || null,
	// 			question_name: req.query.question_name || null,
	// 		}
	// 		const paging: IPaging = {
	// 			page: req.query.page || 1,
	// 			page_size: req.query.page_size || 20,
	// 		};
	// 		let responseData: any = await this.questionService.getListAnswers(paging, filters);

	// 		return BaseResponse(HTTP_STATUS.success, responseData, '', 'Successful');

	// 	} catch (e) {
	// 		console.log('UserController@getLists ---------->', e.message);
	// 		return BaseResponse(e.status, e.response, e.code || 'E0001', e.message);
	// 	}
	// }

	@Get(':id')
	@HttpCode(HttpStatus.OK)
	@ApiResponse({ status: 200, description: 'success' })
	async findById(@Param('id') id: number) {
		try {
			const res = await this.questionService.getById(id);
			if (!res)
				return BaseResponse(HTTP_STATUS.fail, {}, 'E0001', 'provider does not exist');
			else
				return BaseResponse(HTTP_STATUS.success, res, '', 'Successful!');
		} catch (e) {
			return BaseResponse(e.status, e.response, e.code || 'E0001', e.message);
		}
	}
}
