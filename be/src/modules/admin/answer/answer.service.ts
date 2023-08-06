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
import { BadRequestException } from 'src/helpers/response/badRequest';
import { Topic } from 'src/entities/topic.entity';

@Injectable()
export class AnswerService {

	constructor(
		@InjectRepository(User) private readonly userRepo: Repository<User>,
		@InjectRepository(Answer) private readonly answerRepo: Repository<Answer>,
		@InjectRepository(Question) private readonly questionRepo: Repository<Question>,
		@InjectRepository(Topic) private readonly topicRepo: Repository<Topic>,
		@InjectRepository(Result) private readonly resultRepo: Repository<Result>,
	) { }

	async createData(data: CreateDto) {
		let question = await this.questionRepo.findOneBy({ id: data.question_id });
		if (_.isEmpty(question)) {
			throw new BadRequestException({ code: 'A0001', message: 'Not found question' });
		}
		data.created_at = new Date();
		data.updated_at = new Date();
		let newData = await this.answerRepo.create({ ...data });
		await this.answerRepo.save(newData);
		return data;
	}

	async getById(id: number) {
		return await this.answerRepo.findOne(
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
		await this.answerRepo.update(id, newData);
		return this.getById(id);
	}

	async getLists(paging: IPaging, filters: any, user?: any) {
		let conditions: any = await this.buildConditions(filters);
		if(user) {
			conditions.question = {
				user_id: user.id
			};
		}
		let relations: any = {
			question: true,
			user: true,
			results: true
		};
		console.log(conditions);
		const [results, total] = await this.answerRepo.findAndCount({
			where: conditions,
			relations: relations,
			order: { id: 'ASC' },
			take: paging.page_size,
			skip: ((paging.page - 1) * paging.page_size),
		});
		let rs: any = results;
		if(rs?.length > 0 && user) {
			for(let item of rs) {
				item.topic = await this.topicRepo.findOne({
					where: {
						questions: {
							id: item.question_id
						}
					},
					relations: {
						questions: true
					}
				});
			}
		}
		return { result: rs, meta: new Paging(paging.page, paging.page_size, total) };
	}

	

	async buildConditions(filters: any) {
		const conditions: any = {};


		if (filters?.question_id) conditions.question_id = Equal(filters.question_id);
		if (filters?.question_name && filters?.question_name.trim() != '') {
			conditions.question = { name: Like(`%${filters?.question_name.trim()}%`) };
		}
		if (filters?.user_id) conditions.user_id = filters.user_id;
		return conditions;
	}
	async deleteById(id: number) {
		return await this.answerRepo.delete(id);
	}
}
