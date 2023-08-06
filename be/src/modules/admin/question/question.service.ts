import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, In, Like, Not, Raw, Repository } from 'typeorm';
import { IPaging, Paging } from 'src/helpers/helper';

import * as bcrypt from 'bcrypt';
import * as _ from 'lodash';
import { CreateDto } from './dtos/create.dto';
import { Question } from 'src/entities/question.entity';
import { UpdateDto } from './dtos/update.dto';
import { TopicService } from '../topic/topic.service';
import { BadRequestException } from 'src/helpers/response/badRequest';
import { Answer } from 'src/entities/answer.entity';
import { Result } from 'src/entities/result.entity';

@Injectable()
export class QuestionService {

	constructor(
		@InjectRepository(Question) private readonly questionRepo: Repository<Question>,
		@InjectRepository(Answer) private readonly answerRepo: Repository<Answer>,
		@InjectRepository(Result) private readonly resultRepo: Repository<Result>,
		@Inject(forwardRef(() => TopicService)) private topicService: TopicService,
		// @Inject(forwardRef(() => DepartmentService)) private courseService: DepartmentService,
	) { }

	async createData(data: CreateDto, user: any) {
		let topic = await this.topicService.getById(data.topic_id);
		if (_.isEmpty(topic)) {
			throw new BadRequestException({ code: 'Q0001', message: 'Topic not found!' });
		}
		data.created_at = new Date();
		data.updated_at = new Date();
		let newData = await this.questionRepo.create({ ...data, user_id: user.id || 0 });
		await this.questionRepo.save(newData);
		return data;
	}

	async getById(id: number) {
		return await this.questionRepo.findOne(
			{
				where: { id: id },
				relations: {}
			}
		);
	}

	async getOneByCondition(condition: any) {
		return await this.questionRepo.findOne(
			{
				where: condition,
			}
		);
	}

	async updateById(id: number, data: UpdateDto) {
		let topic = await this.topicService.getById(data.topic_id);
		if (_.isEmpty(topic)) {
			throw new BadRequestException({ code: 'Q0001', message: 'Topic not found!' });
		}

		const newData: any = { ...data };
		newData.updated_at = new Date();
		await this.questionRepo.update(id, newData);
		return this.getById(id);
	}

	async getLists(paging: IPaging, filters: any, type: number = 0) {
		let conditions: any = await this.buildConditions(filters);
		let relations: any = {
			topic: true,
			user: true
		};
		if (type == 2) {
			relations.results = true;
			// conditions.results = {
			// 	user_id: filters?.user_id
			// }
			// 
			if(filters.company_id) {
				conditions.user = {
					company_id: filters.company_id
				}
			} else {
				conditions.user_id = filters?.user_id;
			}
		}


		const [users, total] = await this.questionRepo.findAndCount({
			where: conditions,
			relations: relations,
			order: { id: 'ASC' },
			take: paging.page_size,
			skip: ((paging.page - 1) * paging.page_size),
		});

		let rs: any = users;
		if (rs?.length > 0) {
			for (let item of rs) {
				// item.answers = await this.answerRepo.findOne({
				// 	where: {
				// 		question_id: item.id,
				// 		user_id: filters.user_id
				// 	}
				// });
				if (type == 1 && filters?.user_id) {
					item.answers = await this.answerRepo.findOne({
						where: {
							user_id: filters?.user_id,
							question_id: item.id
						}
					});
					item.my_result = await this.resultRepo.findOne({
						where: {
							question_id: item.id,
							answer_id: item.answers?.id
						},
						relations: {
							user: true
						}
					});
				}
				item.count_answer = await this.answerRepo.count({
					where: {
						question_id: item.id
					}
				});
			}
		}
		return { result: users, meta: new Paging(paging.page, paging.page_size, total) };
	}

	async getListAnswers(paging: IPaging, filters: any) {
		let conditions: any = {};
		if (filters?.question_id) conditions.question_id = filters.question_id;
		if (filters?.question_name) conditions.question = {
			name: Like(`%${filters.name.trim()}%`)
		}
		let relations: any = {
			question: true
		};
		const [users, total] = await this.answerRepo.findAndCount({
			where: conditions,
			relations: relations,
			order: { id: 'ASC' },
			take: paging.page_size,
			skip: ((paging.page - 1) * paging.page_size),
		});


		return { result: users, meta: new Paging(paging.page, paging.page_size, total) };
	}

	async buildConditions(filters: any, user_id: number = 0) {
		const conditions: any = {};
		if (filters?.topic_id) conditions.topic_id = filters.topic_id;
		if (filters?.name && filters.name.trim() != '') conditions.name = Like(`%${filters.name.trim()}%`);
		// if(filters?.user_id) conditions.user_id = filters.user_id;
		return conditions;
	}

	async deleteById(id: number) {
		return await this.questionRepo.delete(id);
	}
}
