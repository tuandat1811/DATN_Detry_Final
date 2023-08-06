import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { LoginDto } from './dtos/login.dto';
import { RefreshTokenDto } from './dtos/refresh.dto';
import * as _ from 'lodash';
import * as bcrypt from 'bcrypt';
import * as md5 from 'md5';
import { BadRequestException } from 'src/helpers/response/badRequest';
import { USER_STATUS, USER_STATUS_ACTIVE, USER_TYPE, getSecond } from 'src/helpers/helper';
import { JwtService } from '@nestjs/jwt';
import { UpdateProfileDto } from './dtos/update-profile.dto';
import { UserService } from '../admin/user/user.service';
import { RegisterAdminDto } from './dtos/register-admin.dto';
import { RegisterDto } from './dtos/register.dto';

@Injectable()
export class AuthService {

	constructor(
		@InjectRepository(User) private readonly userRepo: Repository<User>,
		private readonly jwtService: JwtService,
		private readonly userService: UserService,
	) {

	}

	async login(loginDto: LoginDto) {
		let user = await this.userService.findByUsernameOrEmail(loginDto.username);
		if (!_.isEmpty(user)) {
			const isPasswordMatching = await bcrypt.compare(
				loginDto.password.trim(),
				user.password
			);
			if (!isPasswordMatching) {
				throw new BadRequestException({ code: 'LG0003', message: 'Mật khẩu không đúng' });
			}
			if (user.status !== USER_STATUS.ACTIVE) {
				throw new BadRequestException({ code: 'LG0004', message: 'Tài khoản chưa được kích hoạt' });
			}
			const token = await this.genTokenByUser(user);
			delete user.password;
			return {
				token_info: token, user
			}
		}
		throw new BadRequestException({ code: 'LG0002' });
	}

	async refreshToken(refreshDto: RefreshTokenDto) {

	}

	async genTokenByUser(user: any) {
		const payload: any = {
			username: user.username,
			id: user.id,
			type: user.type
		};
		const expIn = Number(process.env.JWT_EXPIRATION_TIME) || 8600 * 10 * 30;
		payload.expires_at = getSecond() + expIn;
		const accessToken = await this.jwtService.signAsync(payload, { expiresIn: expIn });
		const expires_time = new Date().setSeconds(new Date().getSeconds() + expIn);
		return {
			access_token: accessToken,
			expires_in: expIn,
			expires_time: new Date(expires_time),
		};
	}

	async updateProfile(userId: number, data: UpdateProfileDto) {
		let user = await this.userRepo.findOneBy({id: userId});
		if(_.isEmpty(user)) {
			throw new BadRequestException({code: 'U0002'});
		}
		return await this.userService.updateById(userId, data);

	}

	async findById(userId: number) {
		return await this.userService.getById(userId);
	}

	async registerAdmin(data: RegisterAdminDto) {
		return await this.userService.createData({...data,status: USER_STATUS.ACTIVE, type: USER_TYPE.ADMIN});
	}

	async updatePassword(userId: number, data: any) {

		let user = await this.userRepo.findOneBy({id: userId});
		if(_.isEmpty(user)) {
			throw new BadRequestException({code: 'U0002'});
		}

		const isPasswordMatching = await bcrypt.compare(
			data.current_password.trim(),
			user.password
		);
		if (!isPasswordMatching) {
			throw new BadRequestException({ code: 'LG0003', message: 'Mật khẩu không đúng' });
		}

		user.password = data.password.trim();
		delete  user.email;

		return await this.userService.updateById(userId, user);
	}

	async register(data: RegisterDto) {
		let type = USER_TYPE.DEFAULT;
		if(data.company_id) {
			type = USER_TYPE.USER;
		}
		return await this.userService.createData({...data,status: USER_STATUS.ACTIVE, type: type});
	}
}
