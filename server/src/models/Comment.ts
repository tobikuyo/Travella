import { Field, ID, ObjectType } from 'type-graphql';
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
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

    @UpdateDateColumn({ name: 'updated_at' })
    @Field(() => Date)
    updatedAt: Date;

    @ManyToOne(() => User, user => user.comments)
    @Field(() => User)
    author: User;

    @ManyToOne(() => Trip, trip => trip.comments)
    @Field(() => Trip)
    trip: Trip;
}
