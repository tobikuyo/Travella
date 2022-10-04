import { Field, ID, ObjectType } from 'type-graphql';
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn
} from 'typeorm';
import { Comment } from './Comment';
import { Experience } from './Experience';
import { User } from './User';

@Entity('trips')
@ObjectType()
export class Trip extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => ID)
    readonly id: string;

    @Column()
    @Field()
    destination: string;

    @Column({ name: 'departure_date' })
    @Field()
    departureDate: Date;

    @Column({ name: 'return_date' })
    @Field()
    returnDate: Date;

    @CreateDateColumn({ name: 'created_at' })
    @Field()
    createdAt: Date;

    @ManyToOne(() => User, user => user.createdTrips)
    @Field(() => User)
    creator: User;

    @ManyToMany(() => User, user => user.joinedTrips)
    @JoinTable()
    @Field(() => [User])
    participants?: User[];

    @OneToMany(() => Experience, experience => experience.trip)
    @Field(() => [Experience])
    experiences?: Experience[];

    @OneToMany(() => Comment, comment => comment.trip)
    @Field(() => [Comment])
    comments?: Comment[];
}
