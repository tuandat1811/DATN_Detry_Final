import { Controller, Post, Get, Put, Delete, Body, Param, Request, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { BadRequestException } from 'src/helpers/response/badRequest';
import * as _ from 'lodash';
import { BaseResponse, HTTP_STATUS, IPaging, USER_TYPE } from 'src/helpers/helper';
import { TopicService } from './topic.service';
import { CreateDto } from './dtos/create.dto';
import { UpdateDto } from './dtos/update.dto';
import { JwtGuard } from 'src/modules/auth/guards/jwt/jwt.guard';
import { RoleGuard } from 'src/modules/auth/guards/role/role.guard';

@Controller('topics')
@ApiTags('Admin Topic')
export class TopicController {
	constructor(private readonly topicService: TopicService) { }

	@Post('')
	@UseGuards(JwtGuard, new RoleGuard([USER_TYPE.ADMIN, USER_TYPE.USER]))
	@ApiResponse({ status: 200, description: 'success' })
	async createData(
		@Request() req: any,
		@Body() formDto: CreateDto
	) {
		try {
			if (_.isEmpty(formDto)) {
				throw new BadRequestException({ code: 'F0001' });
			}
			const result = await this.topicService.createData(formDto, req.user);

			return BaseResponse(HTTP_STATUS.success, result, '', 'successfully');
		} catch (error) {
			console.log('e@createTopic----> ', error);
			return BaseResponse(error.status, error.response, error.code || 'E0001', error.message);
		}
	}



	@Put(':id')
	@UseGuards(JwtGuard, new RoleGuard([USER_TYPE.ADMIN, USER_TYPE.USER]))
	@HttpCode(HttpStatus.OK)
	@ApiResponse({ status: 200, description: 'success' })
	async updateById(@Param('id') id: number, @Body() updateData: UpdateDto) {
		try {
			const check = await this.topicService.getById(id);
			if (!check) return BaseResponse(HTTP_STATUS.fail, {}, 'E0001', 'Topic does not exist');
			if (_.isEmpty(updateData)) throw new BadRequestException({ code: 'F0001' });
			else {
				return BaseResponse(HTTP_STATUS.success, await this.topicService.updateById(id, updateData), '', 'Updated successfully!');
			}
		} catch (e) {
			console.log('update Topic ---------------->', e.message);
			return BaseResponse(e.status, e.response, e.code || 'E0001', e.message);
		}
	}

	@Delete(':id')
	@UseGuards(JwtGuard, new RoleGuard([USER_TYPE.ADMIN, USER_TYPE.USER]))
	@HttpCode(HttpStatus.OK)
	@ApiResponse({ status: 200, description: 'success' })
	async deleteById(@Param('id') id: number) {
		try {
			const check = await this.topicService.getById(id);
			if (!check) {
				return BaseResponse(HTTP_STATUS.fail, {}, 'E0001', 'Topic does not exist');
			}

			return BaseResponse(HTTP_STATUS.success, await this.topicService.deleteById(id), '', 'Delete successfully!');

		} catch (e) {
			console.log('Delete Topic ---------------->', e.message);
			return BaseResponse(e.status, e.response, e.code || 'E0001', e.message);
		}
	}

	async buildFilter(@Request() req: any) {
		const filters = {
			id: req.query.id || null,
			name: req.query.name || null,
			user_name: req.query.user_name || null,
			company_name: req.query.company_name || null,
			company_id: req.query.company_id || null,
		};
		return filters;
	}

	@Get('/user')
	@UseGuards(JwtGuard, new RoleGuard([USER_TYPE.USER]))
	@HttpCode(HttpStatus.OK)
	@ApiResponse({ status: 200, description: 'success' })
	async getListsByUser(@Request() req: any) {
		try {
			
			const filters: any = await this.buildFilter(req);
			filters.user_id = req.user.type == USER_TYPE.USER && req.user.id || null;
			const paging: IPaging = {
				page: req.query.page || 1,
				page_size: req.query.page_size || 20,
			};
			let responseData: any = await this.topicService.getLists(paging, filters);

			return BaseResponse(HTTP_STATUS.success, responseData, '', 'Successful');

		} catch (e) {
			console.log('TopicController@getLists ---------->', e.message);
			return BaseResponse(e.status, e.response, e.code || 'E0001', e.message);
		}
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
			let responseData: any = await this.topicService.getLists(paging, filters);

			return BaseResponse(HTTP_STATUS.success, responseData, '', 'Successful');

		} catch (e) {
			console.log('TopicController@getLists ---------->', e.message);
			return BaseResponse(e.status, e.response, e.code || 'E0001', e.message);
		}
	}

	@Get(':id')
	@HttpCode(HttpStatus.OK)
	@ApiResponse({ status: 200, description: 'success' })
	async findById(@Param('id') id: number) {
		try {
			const res = await this.topicService.getById(id);
			if (!res)
				return BaseResponse(HTTP_STATUS.fail, {}, 'E0001', 'provider does not exist');
			else
				return BaseResponse(HTTP_STATUS.success, res, '', 'Successful!');
		} catch (e) {
			return BaseResponse(e.status, e.response, e.code || 'E0001', e.message);
		}
	}
}
