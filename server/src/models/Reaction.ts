import { Field, ID, ObjectType } from 'type-graphql';
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn
} from 'typeorm';
import { Experience } from './Experience';
import { User } from './User';

@Entity('reactions')
@ObjectType()
export class Reaction extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => ID)
    readonly id: string;

    @Column('boolean', { default: false })
    @Field({ defaultValue: false })
    like?: boolean;

    @CreateDateColumn({ name: 'created_at' })
    @Field()
    createdAt: Date;

    @ManyToOne(() => User, user => user.id)
    @Field(() => User)
    user: User;

    @ManyToOne(() => Experience, experience => experience.id)
    @Field(() => Experience)
    experience: Experience;
}
