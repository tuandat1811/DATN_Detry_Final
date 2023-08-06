import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Answer } from 'src/entities/answer.entity';
import { Question } from 'src/entities/question.entity';
import { Result } from 'src/entities/result.entity';
import { User } from 'src/entities/user.entity';
import { ResultController } from './result.controller';
import { ResultService } from './result.service';

@Module({
	imports: [
		TypeOrmModule.forFeature([User, Question, Result, Answer]),
		// forwardRef(() => ClassesModule),
		// forwardRef(() => CoursesModule)
	],
	controllers: [ResultController],
	providers: [ResultService],
	exports: [ResultService]
})
export class ResultModule { }
