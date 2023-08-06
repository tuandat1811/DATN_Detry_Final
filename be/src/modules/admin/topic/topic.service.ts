import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Equal, In, Like, Not, Raw, Repository } from 'typeorm';
import { IPaging, Paging } from 'src/helpers/helper';

import * as bcrypt from 'bcrypt';
import * as _ from 'lodash';
import { CreateDto } from './dtos/create.dto';
import { UpdateDto } from './dtos/update.dto';
import { Topic } from 'src/entities/topic.entity';
import { CompanyService } from '../company/company.service';
import { BadRequestException } from 'src/helpers/response/badRequest';
import { Question } from 'src/entities/question.entity';

@Injectable()
export class TopicService {

	constructor(
		@InjectRepository(Topic) private readonly topicRepo: Repository<Topic>,
		@InjectRepository(Question) private readonly questionRepo: Repository<Question>,
		@Inject(forwardRef(() => CompanyService)) private companyService: CompanyService,
		// @Inject(forwardRef(() => DepartmentService)) private courseService: DepartmentService,
	) { }

	async createData(data: CreateDto, user: any) {
		let company = await this.companyService.getById(data.company_id);
		if (_.isEmpty(company)) {
			throw new BadRequestException({ code: 'T0001', message: 'Company not found!' });
		}
		data.created_at = new Date();
		data.updated_at = new Date();
		let newData = await this.topicRepo.create({ ...data, user_id: user.id || 0 });
		await this.topicRepo.save(newData);
		return data;
	}

	async getById(id: number) {
		return await this.topicRepo.findOne(
			{
				where: { id: id },
				relations: {
					user: true,
					company: true
				}
			}
		);

	}

	async updateById(id: number, data: UpdateDto) {
		let company = await this.companyService.getById(data.company_id);
		if (_.isEmpty(company)) {
			throw new BadRequestException({ code: 'T0001', message: 'Company not found!' });
		}
		const newData: any = { ...data };
		newData.updated_at = new Date();
		await this.topicRepo.update(id, newData);
		return this.getById(id);
	}

	async getLists(paging: IPaging, filters: any, user?: any) {
		let conditions: any = await this.buildConditions(filters);
		let relations: any = {
			user: true,
			company: true
		};
		const [data, total] = await this.topicRepo.findAndCount({
			where: conditions,
			relations: relations,
			order: { id: 'ASC' },
			take: paging.page_size,
			skip: ((paging.page - 1) * paging.page_size),
		});
		let rs: any = data;
		if(rs?.length > 0) {
			for(let item of rs) {
				let total_question = await this.questionRepo.count({
					where: {
						topic_id: item.id
					}
				});
				item.total_question = total_question || 0;
			}
		}

		return { result: rs, meta: new Paging(paging.page, paging.page_size, total) };
	}

	async buildConditions(filters: any, user_id: number = 0) {
		const conditions: any = {};
		if(filters?.user_id) conditions.user_id = filters.user_id;
		if (filters?.name && filters?.name?.trim() != '') {
			conditions.name = Like(`%${filters?.name.trim()}%`);
		}
		if (filters?.user_name && filters?.user_name.trim() != '') {
			conditions.user = {
				username: Like(`%${filters?.user_name.trim()}%`)
			};
		}
		if (filters?.company_name && filters?.company_name != '') {
			conditions.company = {
				name: Like(`%${filters?.company_name.trim()}%`)
			};
		}
		if(filters?.company_id) {
			conditions.company_id = filters.company_id;
		}
		return conditions;
	}

	async deleteById(id: number) {
		return await this.topicRepo.delete(id);
	}
}
