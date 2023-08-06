import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { UserModule } from './user/user.module';
import { AccountMiddleware } from './middleware/account.middleware';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { CompanyModule } from './company/company.module';
import { TopicModule } from './topic/topic.module';
import { QuestionModule } from './question/question.module';
import { ResultModule } from './result/result.module';
import { AnswerModule } from './answer/answer.module';

@Module({
    imports: [
        UserModule,
		JwtModule,
		CompanyModule,
		TopicModule,
		QuestionModule,
		ResultModule,
		AnswerModule
    ],
    providers: [
		JwtService
	],
    controllers: []
})
export class AdminModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(AccountMiddleware)
		.forRoutes('user', 'devices', 'providers', 'accessory, department')
	}
 }
