import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Equal, In, Like, Not, Raw, Repository } from 'typeorm';
import { IPaging, Paging, USER_TYPE } from 'src/helpers/helper';

import * as bcrypt from 'bcrypt';
import * as _ from 'lodash';
import { Answer } from 'src/entities/answer.entity';
import { Question } from 'src/entities/question.entity';
import { Result } from 'src/entities/result.entity';
import { CreateDto } from './dtos/create.dto';
import { UpdateDto } from './dtos/update.dto';

@Injectable()
export class ResultService {

	constructor(
		@InjectRepository(User) private readonly userRepo: Repository<User>,
		@InjectRepository(Answer) private readonly answerRepo: Repository<Answer>,
		@InjectRepository(Question) private readonly questionRepo: Repository<Question>,
		@InjectRepository(Result) private readonly resultRepo: Repository<Result>,
	) { }

	async createData(data: CreateDto) {
		data.created_at = new Date();
		data.updated_at = new Date();
		let newData = await this.resultRepo.create({ ...data });
		await this.resultRepo.save(newData);
		return data;
	}

	async getById(id: number) {
		return await this.resultRepo.findOne(
			{
				where: { id: id },
				relations: {
					question: true,
					// answer: true,
					user: true
				}
			}
		);

	}

	async updateById(id: number, data: UpdateDto) {
		const newData: any = { ...data };
		newData.updated_at = new Date();
		await this.resultRepo.update(id, newData);
		return this.getById(id);
	}

	async getLists(paging: IPaging, filters: any, user?: any) {
		// let conditions: any = await this.buildConditions(filters, user);
		let relations: any = {
			question: true,
			user: true
		};
		const [results, total] = await this.resultRepo.findAndCount({
			where: {},
			relations: relations,
			order: { id: 'ASC' },
			take: paging.page_size,
			skip: ((paging.page - 1) * paging.page_size),
		});

		return { result: results, meta: new Paging(paging.page, paging.page_size, total) };
	}
	
	async buildConditions(filters: any, user?: any) {
		const conditions: any = {};
		
		
		if (filters?.question_id) conditions.question_id = Equal(filters.question_id);
		if (filters?.question_name && filters?.question_name.trim() != '') {
			conditions.question = {name: Like(`%${filters?.question_name.trim()}%`)};
		}
		return conditions;
	}
	async deleteById(id: number) {
		return await this.resultRepo.delete(id);
	}
}
