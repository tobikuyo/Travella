import { Field, ID, ObjectType } from 'type-graphql';
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn
} from 'typeorm';
import { Attraction } from './Attraction';
import { Hotel } from './Hotel';
import { Restaurant } from './Restaurant';
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
    @Field(() => Date)
    createdAt: Date;

    @ManyToOne(() => User, user => user.id)
    @Field(() => User)
    user: User;

    @ManyToOne(() => Restaurant, restaurant => restaurant.id)
    @Field(() => Restaurant, { nullable: true })
    restaurant?: Restaurant;

    @ManyToOne(() => Hotel, hotel => hotel.id)
    @Field(() => Hotel, { nullable: true })
    hotel?: Hotel;

    @ManyToOne(() => Attraction, attraction => attraction.id)
    @Field(() => Attraction, { nullable: true })
    attraction?: Attraction;
}
