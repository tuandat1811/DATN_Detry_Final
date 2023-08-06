import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Topic } from 'src/entities/topic.entity';
import { TopicController } from './topic.controller';
import { TopicService } from './topic.service';
import { CompanyModule } from '../company/company.module';
import { Question } from 'src/entities/question.entity';

@Module({
	imports: [
		TypeOrmModule.forFeature([Topic, Question]),
		forwardRef(() => CompanyModule),
		// forwardRef(() => CoursesModule)
	],
	controllers: [TopicController],
	providers: [TopicService],
	exports: [TopicService]
})
export class TopicModule { }
