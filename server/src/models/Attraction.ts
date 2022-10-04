import { Field, ObjectType } from 'type-graphql';
import { Column, Entity } from 'typeorm';
import { Experience } from './Experience';

@Entity('attractions')
@ObjectType()
export class Attraction extends Experience {
    @Column('simple-array', { nullable: true })
    @Field(() => [String], { nullable: true })
    subcategories?: string[];

    @Column('simple-array', { nullable: true })
    @Field(() => [String], { nullable: true })
    awards?: string[];
}
