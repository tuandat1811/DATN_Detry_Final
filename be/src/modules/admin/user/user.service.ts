import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Equal, In, Like, Not, Raw, Repository } from 'typeorm';
import { IPaging, Paging } from 'src/helpers/helper';

import * as bcrypt from 'bcrypt';
import * as _ from 'lodash';
import { ValidateService } from './services/validate.service';

@Injectable()
export class UserService {

	constructor(
		@InjectRepository(User) private readonly userRepository: Repository<User>,
		// @Inject(forwardRef(() => TopicService)) private roomService: TopicService,
		// @Inject(forwardRef(() => DepartmentService)) private courseService: DepartmentService,
		private readonly validateUserService: ValidateService
	) { }

	async createData(data: CreateUserDto) {
		await this.validateUserService.validateUser(data, true);
		data.created_at = new Date();
		data.updated_at = new Date();
		data.password = await bcrypt.hash(data.password.trim(), 10);
		let newData = await this.userRepository.create({ ...data });
		await this.userRepository.save(newData);
		return data;
	}

	async getById(id: number) {
		return await this.userRepository.findOne(
			{
				where: { id: id },
				relations: {
					company: true
				}
			}
		);

	}

	async updateById(id: number, data: UpdateUserDto) {
		await this.validateUserService.validateUser(data, false, id);
		const newData: any = { ...data };
		newData.updated_at = new Date();
		if (newData.password) {
			newData.password = await bcrypt.hash(newData.password.trim(), 10);
		}
		await this.userRepository.update(id, newData);
		return this.getById(id);
	}

	async getLists(paging: IPaging, filters: any, user?: any) {
		const userId = user?.id || 0;
		let conditions: any = await this.buildConditions(filters, userId);
		let relations: any = {
			// classrooms: true,
			company: true
		};
		const [users, total] = await this.userRepository.findAndCount({
			where: conditions,
			relations: relations,
			order: { id: 'ASC' },
			take: paging.page_size,
			skip: ((paging.page - 1) * paging.page_size),
		});


		return { result: users, meta: new Paging(paging.page, paging.page_size, total) };
	}


	async getListStudentByTeacherId(paging: IPaging, filters: any) {
		let conditions: any = await this.buildConditions(filters);
		let relations: any = {
			// classrooms: true,
			// courses: true
		};
		const [users, total] = await this.userRepository.findAndCount({
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
		conditions.id = Not(user_id);
		if (filters?.email && filters?.email.trim() != '') conditions.email = Like(`%${filters?.email.trim()}%`);
		if (filters?.phone && filters?.phone.trim() != '') conditions.phone = Like(`%${filters?.phone.trim()}%`);
		if (filters?.status && filters?.status != '') conditions.status = filters?.status;
		if (filters?.role) conditions.role = Number(filters.role);
		return conditions;
	}

	async findByUsernameOrEmail(username: string) {
		return await this.userRepository.findOne({
			where: [
				{
					email: username
				},
				{
					username: username
				}
			]
		});
	}

	async deleteById(id: number) {
		return await this.userRepository.delete(id);
	}
}
