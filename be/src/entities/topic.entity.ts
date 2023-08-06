import { Column, Entity, JoinColumn, ManyToOne,OneToMany,PrimaryGeneratedColumn } from 'typeorm';
import { Question } from './question.entity';
import { User } from './user.entity';
import { Company } from './company.entity';


@Entity('topics', { schema: 'public' })
export class Topic {
    @PrimaryGeneratedColumn('increment',{name: 'id'})
    id: number;

    @Column('varchar', { name: 'name', length: 255 })
    name: string;

	@Column()
    user_id: number;

	@Column()
    company_id: number;

	@Column()
    avatar: string;

	@Column('timestamp', { name: 'created_at', default: () => 'now()' })
	created_at: Date;

	@Column('timestamp', { name: 'updated_at', nullable: true, default: () => 'now()' })
	updated_at: Date;

	@OneToMany(() => Question, ex => ex.topic)
	@JoinColumn({ name: 'topic_id', referencedColumnName: 'id'})
	questions: Question[];

	@ManyToOne(() => User, ex => ex.topics)
	@JoinColumn({ name: 'user_id', referencedColumnName: 'id'})
	user: User;

	@ManyToOne(() => Company, ex => ex.topics)
	@JoinColumn({ name: 'company_id', referencedColumnName: 'id'})
	company: Company;
}
