import { Max, max } from "class-validator";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Question } from "./question.entity";
import { Result } from "./result.entity";



@Entity('answers', { schema: 'public' })
export class Answer {
    @PrimaryGeneratedColumn('increment',{name: "id"})
    id: number;

    @Column()
    user_id: number;

	@Column()
    question_id: number;

    @Column()
    content_answer: string;
	
    @Column('timestamp', { name: 'created_at', default: () => 'now()' })
	created_at: Date;

	@Column('timestamp', { name: 'updated_at', nullable: true, default: () => 'now()' })
	updated_at: Date;

	@ManyToOne(() => Question, q => q.answers)
	@JoinColumn({ name: "question_id", referencedColumnName: "id"})
	question: Question;

	@ManyToOne(() => User, ex => ex.answers)
	@JoinColumn({ name: "user_id", referencedColumnName: "id"})
	user: User;

	@OneToMany(() => Result, ex => ex.answer)
	@JoinColumn({ name: 'answer_id', referencedColumnName: 'id'})
	results: Result[];

}
