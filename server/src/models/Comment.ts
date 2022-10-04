import { Field, ID, ObjectType } from 'type-graphql';
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn
} from 'typeorm';
import { Trip } from './Trip';
import { User } from './User';

@Entity('comments')
@ObjectType()
export class Comment extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => ID)
    readonly id: string;

    @Column()
    @Field()
    text: string;

    @CreateDateColumn({ name: 'created_at' })
    @Field(() => Date)
    createdAt: Date;

    @ManyToMany(() => User, user => user.id)
    @JoinTable()
    @Field(() => User)
    author: User;

    @ManyToOne(() => Trip, trip => trip.comments)
    @Field(() => Trip)
    trip: Trip;
}
