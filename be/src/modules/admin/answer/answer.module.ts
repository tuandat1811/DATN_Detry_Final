import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Answer } from 'src/entities/answer.entity';
import { Question } from 'src/entities/question.entity';
import { Result } from 'src/entities/result.entity';
import { User } from 'src/entities/user.entity';
import { AnswerService } from './answer.service';
import { AnswerController } from './answer.controller';
import { Topic } from 'src/entities/topic.entity';

@Module({
	imports: [
		TypeOrmModule.forFeature([User, Question, Result, Answer, Topic]),
		// forwardRef(() => ClassesModule),
		// forwardRef(() => CoursesModule)
	],
	controllers: [AnswerController],
	providers: [AnswerService],
	exports: [AnswerService]
})
export class AnswerModule { }
