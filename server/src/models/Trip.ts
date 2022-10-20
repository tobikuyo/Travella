import { Field, ID, ObjectType } from 'type-graphql';
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
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
    @Field(() => Date)
    departureDate: Date;

    @Column({ name: 'return_date' })
    @Field(() => Date)
    returnDate: Date;

    @CreateDateColumn({ name: 'created_at' })
    @Field(() => Date)
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    @Field(() => Date)
    updatedAt: Date;

    @ManyToOne(() => User, user => user.createdTrips, { nullable: false })
    @Field(() => User, { nullable: false })
    creator: User;

    @Column('simple-array', { nullable: true })
    @Field(() => [String], {
        nullable: true,
        description: 'A list of emails that the creator has invited to join the trip'
    })
    invitees?: string[];

    @Column('simple-array', { nullable: true })
    @Field(() => [String], { nullable: true })
    participants?: string[];

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
