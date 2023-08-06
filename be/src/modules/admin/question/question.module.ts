import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { QuestionController } from './question.controller';
import { QuestionService } from './question.service';
import { Question } from 'src/entities/question.entity';
import { TopicModule } from '../topic/topic.module';
import { Answer } from 'src/entities/answer.entity';
import { Result } from 'src/entities/result.entity';

@Module({
	imports: [
		TypeOrmModule.forFeature([Question, Answer, Result]),
		forwardRef(() => TopicModule),
		// forwardRef(() => CoursesModule)
	],
	controllers: [QuestionController],
	providers: [QuestionService, ],
	exports: [QuestionService, ]
})
export class QuestionModule { }
