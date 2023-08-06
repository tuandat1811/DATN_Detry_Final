import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from 'src/entities/company.entity';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { Topic } from 'src/entities/topic.entity';

@Module({
	imports: [
		TypeOrmModule.forFeature([Company, Topic]),
		// forwardRef(() => ClassesModule),
		// forwardRef(() => CoursesModule)
	],
	controllers: [CompanyController],
	providers: [CompanyService],
	exports: [CompanyService]
})
export class CompanyModule {}
