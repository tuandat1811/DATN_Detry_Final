import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { USER_STATUS, USER_TYPE } from 'src/helpers/helper';
import { Company } from './company.entity';
import { Result } from './result.entity';
import { Answer } from './answer.entity';
import { Topic } from './topic.entity';


@Entity('users', { schema: 'public' })
export class User {
    @PrimaryGeneratedColumn('increment',{name: 'id'})
    id: number;

	@Column({length: 255, nullable: false })
    name: string;

    @Column({ length: 255, nullable: false, unique: true })
    email: string;

    @Column({ length: 255, nullable: false, unique: true })
    username: string;

	@Column({ unique: true, nullable: true })
    phone: string;

    @Column({nullable: false })
    password: string;

    @Column( 
	{ 
		enum: USER_TYPE,
		default: USER_TYPE.USER 
	})
    type: string;

    @Column({nullable: true})
    avatar?: string;

    @Column({nullable: true})
    company_id?: number;

    @Column(
		{ 
			enum: USER_STATUS,
			default: USER_STATUS.PENDING 
		}
	)
    status: string;

    @Column('timestamp', { name: 'created_at' })
	created_at: Date;

    @Column('timestamp', { name: 'updated_at' })
	updated_at: Date;

	@OneToMany(() => Result, ex => ex.user)
	@JoinColumn({ name: 'user_id', referencedColumnName: 'id'})
	results: Result[];

	@OneToMany(() => Result, ex => ex.user)
	@JoinColumn({ name: 'user_id', referencedColumnName: 'id'})
	questions: Result[];

	@OneToMany(() => Answer, ex => ex.user)
	@JoinColumn({ name: 'user_id', referencedColumnName: 'id'})
	answers: Answer[];

	@OneToMany(() => Topic, ex => ex.user)
	@JoinColumn({ name: 'user_id', referencedColumnName: 'id'})
	topics: Topic[];

	@ManyToOne(() => Company, ex => ex.users)
	@JoinColumn({ name: 'company_id', referencedColumnName: 'id'})
	company: Company;
}
