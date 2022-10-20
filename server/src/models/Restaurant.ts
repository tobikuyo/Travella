import { Field, ID, Int, ObjectType } from 'type-graphql';
import {
    BaseEntity,
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn
} from 'typeorm';
import { Reaction } from './Reaction';
import { Trip } from './Trip';

@Entity('restaurants')
@ObjectType()
export class Restaurant extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => ID)
    readonly id: string;

    @Column()
    @Field()
    name: string;

    @Column('text')
    @Field()
    image: string;

    @Column('text')
    @Field()
    ranking: string;

    @Column('text', { nullable: true })
    @Field({ nullable: true })
    description?: string;

    @Column('float', { nullable: true })
    @Field({ nullable: true })
    rating: number;

    @Column({ name: 'review_count', default: 0 })
    @Field(() => Int, { defaultValue: 0 })
    reviewCount: number;

    @Column({ name: 'price_range', nullable: true })
    @Field({ nullable: true })
    priceRange?: string;

    @Column()
    @Field()
    address: string;

    @Column({ nullable: true })
    @Field({ nullable: true })
    website?: string;

    @Column('text', { name: 'tripadvisor_link', nullable: true })
    @Field({ nullable: true })
    tripadvisorLink?: string;

    @ManyToOne(() => Trip, trip => trip.id)
    @Field(() => Trip)
    trip: Trip;

    @Column('simple-array', { nullable: true })
    @Field(() => [String], { nullable: true })
    cuisine?: string[];

    @OneToMany(() => Reaction, reaction => reaction.restaurant)
    @Field(() => [Reaction], { nullable: true })
    reactions?: Reaction[];
}
