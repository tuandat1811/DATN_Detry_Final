import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Like, Repository } from 'typeorm';
import { newArrayError, regexEmail, regexGmail, regexPass, regexPhone } from 'src/helpers/helper';
import * as _ from 'lodash';
import { BadRequestException } from 'src/helpers/response/badRequest';

@Injectable()
export class ValidateService {

	constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) { }

	async validateUser(userDto: any, isCreated = false, user_id = 0) {
		if (_.isEmpty(userDto)) {
			throw new BadRequestException({ code: 'F0001' });
		}
		let errorData: any = {};
		if (userDto.password) {
			if(!regexPass.test(userDto.password)) {
				errorData.password = newArrayError(errorData.password, 'Password không đúng định dạng (chữ và số)!');
			}
		}

		if (userDto.username) {
			let userName: any = await this.userRepository.findOne({ where: { username: userDto.username } });

			if (!_.isEmpty(userName)) {
				if (isCreated) {
					errorData.username = newArrayError(errorData.username, 'Tên đăng nhập đã tồn tại');
				}
				else if (userName.id != user_id) {
					errorData.username = newArrayError(errorData.username, 'Tên đăng nhập đã tồn tại');
				}
			}
		}
		if (userDto.email) {
			let email: any = await this.userRepository.findOne({ where: { email: userDto.email } });

			if (!_.isEmpty(email)) {
				if (isCreated) {
					errorData.email = newArrayError(errorData.email, 'Email đã tồn tại');
				}
				// else if (email.id !== user_id) {
				// 	errorData.email = newArrayError(errorData.email, 'Email đã tồn tại');
				// }
			}
		}

		if (userDto.phone) {

			let user: any = this.userRepository.findOne({
				where: {
					phone: Like(`%${userDto.phone}%`),
				}
			});
			if (!_.isEmpty(user)) {
				if (isCreated) {
					errorData.phone = newArrayError(errorData.phone, 'Số điện thoại đã tồn tại');
				}
				else if (user.id != user_id) {
					errorData.phone = newArrayError(errorData.phone, 'Số điện thoại đã tồn tại');
				}
			}
		}

		if (!_.isEmpty(errorData)) {
			throw new BadRequestException({ code: 'F0002', message: null, data: errorData });
		}
	}

}
