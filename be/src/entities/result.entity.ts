import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Question } from "./question.entity";



@Entity('results', { schema: 'public' })
export class Result {
    @PrimaryGeneratedColumn('increment',{name: "id"})
    id: number;

    @Column()
    user_id: number;

	@Column()
    question_id: number;

	@Column()
    answer_id: number;

    @Column()
    content_result: string;

    @Column()
	time: Date;

    @Column()
    point: number;

    @Column('timestamp', { name: 'created_at', default: () => 'now()' })
	created_at: Date;

	@Column('timestamp', { name: 'updated_at', nullable: true, default: () => 'now()' })
	updated_at: Date;

	@ManyToOne(() => Question, ex => ex.results)
	@JoinColumn({ name: "question_id", referencedColumnName: "id"})
	question: Question;

	@ManyToOne(() => User, ex => ex.results)
	@JoinColumn({ name: "user_id", referencedColumnName: "id"})
	user: User;
}
