import { Controller, Post, Get, Put, Delete, Body, Param, Request, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { BadRequestException } from 'src/helpers/response/badRequest';
import * as _ from 'lodash';
import { BaseResponse, HTTP_STATUS, IPaging, USER_TYPE } from 'src/helpers/helper';
import { JwtGuard } from 'src/modules/auth/guards/jwt/jwt.guard';
import { RoleGuard } from 'src/modules/auth/guards/role/role.guard';
import { ResultService } from './result.service';
import { CreateDto } from './dtos/create.dto';
import { UpdateDto } from './dtos/update.dto';

@Controller('results')
@ApiTags('Admin Result')
export class ResultController {
	constructor(private readonly resultService: ResultService) { }

	@Post('')
	@UseGuards(JwtGuard, new RoleGuard([USER_TYPE.USER]))
	@ApiResponse({ status: 200, description: 'success' })
	async createData(
		@Body() formDto: CreateDto,
		@Request() req: any,
	) {
		try {
			if (_.isEmpty(formDto)) {
				throw new BadRequestException({ code: 'F0001' });
			}
			formDto.user_id = req.user.id;
			const result = await this.resultService.createData(formDto);

			return BaseResponse(HTTP_STATUS.success, result, '', 'successfully');
		} catch (error) {
			console.log('e@createResult----> ', error);
			return BaseResponse(error.status, error.response, error.code || 'E0001', error.message);
		}
	}



	@Put(':id')
	@UseGuards(JwtGuard, new RoleGuard([USER_TYPE.USER]))
	@HttpCode(HttpStatus.OK)
	@ApiResponse({ status: 200, description: 'success' })
	async updateById(@Param('id') id: number, @Body() updateData: UpdateDto) {
		try {
			const check = await this.resultService.getById(id);
			if (!check) return BaseResponse(HTTP_STATUS.fail, {}, 'E0001', 'Result does not exist');
			if (_.isEmpty(updateData)) throw new BadRequestException({ code: 'F0001' });

			const response = await this.resultService.updateById(id, updateData);

			return BaseResponse(HTTP_STATUS.success, response, '', 'Updated successfully!');
		} catch (e) {
			console.log('update Result ---------------->', e.message);
			return BaseResponse(e.status, e.response, e.code || 'E0001', e.message);
		}
	}

	@Delete(':id')
	@UseGuards(JwtGuard, new RoleGuard([USER_TYPE.USER]))
	@HttpCode(HttpStatus.OK)
	@ApiResponse({ status: 200, description: 'success' })
	async deleteById(@Param('id') id: number) {
		try {
			const check = await this.resultService.getById(id);
			if (!check) {
				return BaseResponse(HTTP_STATUS.fail, {}, 'E0001', 'Result does not exist');
			}

			return BaseResponse(HTTP_STATUS.success, await this.resultService.deleteById(id), '', 'Delete successfully!');

		} catch (e) {
			console.log('Delete Result ---------------->', e.message);
			return BaseResponse(e.status, e.response, e.code || 'E0001', e.message);
		}
	}

	async buildFilter(@Request() req: any) {
		const filters = {
			id: req.query.id || null,
			question_name: req.query.question_name || null,
			question_id: req.query.question_id || null,
			user_id: req.query.user_id || null,
		};
		return filters;
	}

	@Get('')
	@UseGuards(JwtGuard)
	@HttpCode(HttpStatus.OK)
	@ApiResponse({ status: 200, description: 'success' })
	async getLists(@Request() req: any) {
		try {
			const user = req.user;
			const filters = await this.buildFilter(req);
			const paging: IPaging = {
				page: req.query.page || 1,
				page_size: req.query.page_size || 20,
			};
			let responseData: any = await this.resultService.getLists(paging, filters, user);

			return BaseResponse(HTTP_STATUS.success, responseData, '', 'Successful');

		} catch (e) {
			console.log('ResultController@getLists ---------->', e.message);
			return BaseResponse(e.status, e.response, e.code || 'E0001', e.message);
		}
	}

	@Get(':id')
	@UseGuards(JwtGuard)
	@HttpCode(HttpStatus.OK)
	@ApiResponse({ status: 200, description: 'success' })
	async findById(@Param('id') id: number) {
		try {
			const res = await this.resultService.getById(id);
			return BaseResponse(HTTP_STATUS.success, res, '', 'Successful!');
				
		} catch (e) {
			return BaseResponse(e.status, e.response, e.code || 'E0001', e.message);
		}
	}
}
