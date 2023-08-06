import { Controller, Post, Get, Put, Delete, Body, Param, Request, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { BadRequestException } from '../../../helpers/response/badRequest';
import * as _ from 'lodash';
import { BaseResponse, HTTP_STATUS, IPaging, USER_TYPE } from '../../../helpers/helper';
import { CreateDto } from './dtos/create.dto';
import { UpdateDto } from './dtos/update.dto';
import { JwtGuard } from '../../../modules/auth/guards/jwt/jwt.guard';
import { RoleGuard } from '../../../modules/auth/guards/role/role.guard';
import { CompanyService } from './company.service';

@Controller('company')
@ApiTags('Admin Company')
export class CompanyController {
	constructor(private readonly companyService: CompanyService) { }

	@Post('')
	@UseGuards(JwtGuard, new RoleGuard([USER_TYPE.ADMIN]))
	@ApiResponse({ status: 200, description: 'success' })
	async createData(
		@Body() formDto: CreateDto
	) {
		try {
			if (_.isEmpty(formDto)) {
				throw new BadRequestException({ code: 'F0001' });
			}
			const result = await this.companyService.createData(formDto);

			return BaseResponse(HTTP_STATUS.success, result, '', 'successfully');
		} catch (error) {
			console.log('e@createProduct----> ', error);
			return BaseResponse(error.status, error.response, error.code || 'E0001', error.message);
		}
	}



	@Put(':id')
	@UseGuards(JwtGuard, new RoleGuard([USER_TYPE.ADMIN]))
	@HttpCode(HttpStatus.OK)
	@ApiResponse({ status: 200, description: 'success' })
	async updateById(@Param('id') id: number, @Body() updateData: UpdateDto) {
		try {
			const check = await this.companyService.getById(id);
			if (!check) return BaseResponse(HTTP_STATUS.fail, {}, 'E0001', 'User does not exist');
			if (_.isEmpty(updateData)) throw new BadRequestException({ code: 'F0001' });
			else {
				return BaseResponse(HTTP_STATUS.success, await this.companyService.updateById(id, updateData), '', 'Updated successfully!');
			}
		} catch (e) {
			console.log('update user ---------------->', e.message);
			return BaseResponse(e.status, e.response, e.code || 'E0001', e.message);
		}
	}

	@Delete(':id')
	@HttpCode(HttpStatus.OK)
	@UseGuards(JwtGuard, new RoleGuard([USER_TYPE.ADMIN]))
	@ApiResponse({ status: 200, description: 'success' })
	async deleteById(@Param('id') id: number) {
		try {
			const check = await this.companyService.getById(id);
			if (!check) {
				return BaseResponse(HTTP_STATUS.fail, {}, 'E0001', 'user does not exist');
			}

			return BaseResponse(HTTP_STATUS.success, await this.companyService.deleteById(id), '', 'Delete successfully!');

		} catch (e) {
			console.log('Delete user ---------------->', e.message);
			return BaseResponse(e.status, e.response, e.code || 'E0001', e.message);
		}
	}

	async buildFilter(@Request() req: any) {
		const filters = {
			id: req.query.id || null,
			email: req.query.email || null,
			status: req.query.status || null,
			phone: req.query.phone || null,
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
			let responseData: any = await this.companyService.getLists(paging, filters);

			return BaseResponse(HTTP_STATUS.success, responseData, '', 'Successful');

		} catch (e) {
			console.log('UserController@getLists ---------->', e.message);
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
			filters.user_id = req.user.id || null
			const paging: IPaging = {
				page: req.query.page || 1,
				page_size: req.query.page_size || 20,
			};
			let responseData: any = await this.companyService.getLists(paging, filters);

			return BaseResponse(HTTP_STATUS.success, responseData, '', 'Successful');

		} catch (e) {
			console.log('UserController@getLists ---------->', e.message);
			return BaseResponse(e.status, e.response, e.code || 'E0001', e.message);
		}
	}

	@Get(':id')
	@HttpCode(HttpStatus.OK)
	@ApiResponse({ status: 200, description: 'success' })
	async findById(@Param('id') id: number) {
		try {
			const res = await this.companyService.getById(id);
			return BaseResponse(HTTP_STATUS.success, res, '', 'Successful!');

		} catch (e) {
			return BaseResponse(e.status, e.response, e.code || 'E0001', e.message);
		}
	}
}
