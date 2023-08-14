import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Topic } from "./topic.entity";
import { Answer } from "./answer.entity";
import { User } from "./user.entity";
import { Result } from "./result.entity";



@Entity('questions', { schema: 'public' })
export class Question {
    @PrimaryGeneratedColumn('increment',{name: "id"})
    id: number;

	@Column()
    name: string;

	@Column()
    user_id: number;

	@Column()
    topic_id: number;

    @Column()
    content_question: string;

	@Column()
	avatar: string;

    @Column('timestamp', { name: 'created_at', default: () => 'now()' })
	created_at: Date;

	@Column('timestamp', { name: 'updated_at', nullable: true, default: () => 'now()' })
	updated_at: Date;

	@ManyToOne(() => Topic, ex => ex.questions)
	@JoinColumn({ name: "topic_id", referencedColumnName: "id"})
	topic: Topic;

	@ManyToOne(() => User, ex => ex.questions)
	@JoinColumn({ name: "user_id", referencedColumnName: "id"})
	user: User;

	@OneToMany(() => Answer, a=> a.question)
	@JoinColumn({ name: "question_id", referencedColumnName: "id"})
	answers: Answer[];

	@OneToMany(() => Result, a=> a.question)
	@JoinColumn({ name: "question_id", referencedColumnName: "id"})
	results: Result[];
}
