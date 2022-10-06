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
import { Attraction, Comment, Hotel, Restaurant, User } from '.';

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

    @ManyToOne(() => User, user => user.createdTrips, { nullable: false })
    @Field(() => User, { nullable: false })
    creator: User;

    @ManyToMany(() => User, user => user.joinedTrips)
    @JoinTable()
    @Field(() => [User])
    participants?: User[];

    @OneToMany(() => Restaurant, restaurant => restaurant.trip)
    @Field(() => [Restaurant])
    restaurants?: Restaurant[];

    @OneToMany(() => Hotel, hotel => hotel.trip)
    @Field(() => [Hotel])
    hotels?: Hotel[];

    @OneToMany(() => Attraction, attraction => attraction.trip)
    @Field(() => [Attraction])
    attractions?: Attraction[];

    @OneToMany(() => Comment, comment => comment.trip)
    @Field(() => [Comment])
    comments?: Comment[];
}
