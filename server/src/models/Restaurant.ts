import { Field, ObjectType } from 'type-graphql';
import { Column, Entity } from 'typeorm';
import { Experience } from './Experience';

@Entity('restaurants')
@ObjectType()
export class Restaurant extends Experience {
    @Column('simple-array', { nullable: true })
    @Field(() => [String], { nullable: true })
    cuisine?: string[];
}
