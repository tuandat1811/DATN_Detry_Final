import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { CreateDto } from './dtos/create.dto';
import { UpdateDto } from './dtos/update.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, In, Like, Not, Raw, Repository } from 'typeorm';
import { IPaging, Paging, newArrayError, regexEmail, regexGmail, regexPhone } from '../../../helpers/helper';

import * as bcrypt from 'bcrypt';
import * as _ from 'lodash';
import { Company } from '../../../entities/company.entity';
import { BadRequestException } from 'src/helpers/response/badRequest';
import { Topic } from 'src/entities/topic.entity';

@Injectable()
export class CompanyService {

	constructor(
		@InjectRepository(Company) private readonly companyRepo: Repository<Company>,
		@InjectRepository(Topic) private readonly topicRepo: Repository<Topic>,
		// @Inject(forwardRef(() => TopicService)) private roomService: TopicService,
		// @Inject(forwardRef(() => DepartmentService)) private courseService: DepartmentService,
	) { }

	async validateCompany(company: any, user_id: number = 0, isCreated: boolean = false) {
		let errorData: any = {};
		if (company.email) {
			let userEmail: any = await this.companyRepo.findOne({ where: { email: company.email } });

			if (!_.isEmpty(userEmail)) {
				if (isCreated) {
					errorData.email = newArrayError(errorData.email, 'Email is existed');
				}
				else if (userEmail.id != user_id) {
					errorData.email = newArrayError(errorData.email, 'Email is existed');
				}
			}
		}
		if (company.phone) {

			let user: any = this.companyRepo.findOne({
				where: {
					phone: Like(`%${company.phone}%`),
				}
			});
			if (!_.isEmpty(user)) {
				if (isCreated) {
					errorData.phone = newArrayError(errorData.phone, 'Phone is existed');
				}
				else if (user.id != user_id) {
					errorData.phone = newArrayError(errorData.phone, 'Phone is existed');
				}
			}
		}
		console.log(errorData);
		if (!_.isEmpty(errorData)) {
			throw new BadRequestException({ code: 'F0002', message: null, data: errorData });
		}
	}

	async createData(data: CreateDto) {
		await this.validateCompany(data, 0, true);
		let newData = await this.companyRepo.create({ ...data });
		await this.companyRepo.save(newData);
		return data;
	}

	async getById(id: number) {
		const rs: any =  await this.companyRepo.findOne(
			{
				where: { id: id }
			}
		);
		rs.total_topic = await this.topicRepo.count({
			where: {
				company_id: id
			}
		});
		return rs

	}

	async updateById(id: number, data: UpdateDto) {
		await this.validateCompany(data, id, false);
		const newData: any = { ...data };
		newData.updated_at = new Date();
		await this.companyRepo.update(id, newData);
		return this.getById(id);
	}

	async getLists(paging: IPaging, filters: any, user?: any) {
		let conditions: any = await this.buildConditions(filters);
		if(filters.user_id) {
			conditions.users = {
				id: filters.user_id
			}
		}
		const [companies, total] = await this.companyRepo.findAndCount({
			where: conditions,
			relations: {
				users: true
			},
			order: { id: 'ASC' },
			take: paging.page_size,
			skip: ((paging.page - 1) * paging.page_size),
		});
		let rs: any = companies;
		if(!_.isEmpty(rs)) {
			for(let item of rs) {
				item.total_topic = await this.topicRepo.count({
					where: {
						company_id: item.id
					}
				});
			}
		} 
		return { result: rs, meta: new Paging(paging.page, paging.page_size, total) };
	}

	async buildConditions(filters: any) {
		const conditions: any = {};
		if (filters?.email && filters?.email.trim() != '') conditions.email = Like(`%${filters?.email.trim()}%`);
		if (filters?.phone && filters?.phone.trim() != '') conditions.phone = Like(`%${filters?.phone.trim()}%`);
		// if (filters?.status && filters?.status != '') conditions.status = filters?.status;
		// if (filters?.role) conditions.role = Number(filters.role);
		return conditions;
	}

	async deleteById(id: number) {
		return await this.companyRepo.delete(id);
	}
}
