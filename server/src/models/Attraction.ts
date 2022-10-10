import { Field, ObjectType } from 'type-graphql';
import { Column, Entity, OneToMany } from 'typeorm';
import { Experience } from './Experience';
import { Reaction } from './Reaction';

@Entity('attractions')
@ObjectType()
export class Attraction extends Experience {
    @Column('simple-array', { nullable: true })
    @Field(() => [String], { nullable: true })
    subcategories?: string[];

    @Column('simple-array', { nullable: true })
    @Field(() => [String], { nullable: true })
    awards?: string[];

    @OneToMany(() => Reaction, reaction => reaction.attraction)
    @Field(() => [Reaction], { nullable: true })
    reactions?: Reaction[];
}
