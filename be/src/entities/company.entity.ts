import { Column, Entity, JoinColumn,ManyToOne,OneToMany,PrimaryGeneratedColumn } from 'typeorm';
import { USER_STATUS } from 'src/helpers/helper';
import { User } from './user.entity';
import { Topic } from './topic.entity';



@Entity('company', { schema: 'public' })
export class Company {
    @PrimaryGeneratedColumn('increment',{name: 'id'})
    id: number;

    @Column({length: 255, nullable: false })
    name: string;

    @Column({ length: 255, nullable: false, unique: true })
    email: string;

	@Column({ unique: true, nullable: true })
    phone: string;

	@Column()
    avatar: string;

	@Column()
    logo: string;

    @Column(
		{ 
			enum: USER_STATUS,
			default: USER_STATUS.PENDING 
		}
	)
    status: string;

	@Column('timestamp', { name: 'created_at', default: () => 'now()' })
	created_at: Date;

	@Column('timestamp', { name: 'updated_at', nullable: true, default: () => 'now()' })
	updated_at: Date;


	@OneToMany(() => User, ex => ex.company)
	@JoinColumn({ name: 'company_id', referencedColumnName: 'id'})
	users: User[];

	@OneToMany(() => Topic, ex => ex.company)
	@JoinColumn({ name: 'company_id', referencedColumnName: 'id'})
	topics: Topic[];

}
