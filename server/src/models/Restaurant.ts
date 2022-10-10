import { Field, ObjectType } from 'type-graphql';
import { Column, Entity, OneToMany } from 'typeorm';
import { Experience } from './Experience';
import { Reaction } from './Reaction';

@Entity('restaurants')
@ObjectType()
export class Restaurant extends Experience {
    @Column('simple-array', { nullable: true })
    @Field(() => [String], { nullable: true })
    cuisine?: string[];

    @OneToMany(() => Reaction, reaction => reaction.restaurant)
    @Field(() => [Reaction], { nullable: true })
    reactions?: Reaction[];
}
