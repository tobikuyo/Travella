import { Field, ID, ObjectType } from 'type-graphql';
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToMany,
    OneToMany,
    PrimaryGeneratedColumn
} from 'typeorm';
import { Comment } from 'models';
import { UserType } from 'typeDefs/enums/UserType';
import { Reaction } from './Reaction';
import { Trip } from './Trip';

@Entity('users')
@ObjectType()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => ID)
    readonly id: string;

    @Column({ type: 'enum', enum: UserType, default: UserType.Registered })
    @Field(() => UserType, { defaultValue: UserType.Registered })
    type?: UserType;

    @Column()
    @Field()
    name: string;

    @Column({ unique: true })
    @Field()
    email: string;

    @Column({ comment: 'Only applicable to registered users', nullable: true })
    password?: string;

    @CreateDateColumn({ name: 'created_at' })
    @Field()
    createdAt: Date;

    @OneToMany(() => Trip, trip => trip.creator)
    @Field(() => Trip, { nullable: true })
    createdTrips?: Trip[];

    @ManyToMany(() => Trip, trip => trip.participants)
    @Field(() => [Trip], { nullable: true })
    joinedTrips?: Trip[];

    @OneToMany(() => Reaction, reaction => reaction.user)
    @Field(() => [Reaction])
    reactions?: Reaction[];

    @OneToMany(() => Comment, comment => comment.author)
    @Field(() => [Comment])
    comments?: Comment[];
}
