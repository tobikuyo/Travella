import { Field, ObjectType } from 'type-graphql';
import { Entity, OneToMany } from 'typeorm';
import { Experience } from './Experience';
import { Reaction } from './Reaction';

@Entity('hotels')
@ObjectType()
export class Hotel extends Experience {
    @OneToMany(() => Reaction, reaction => reaction.hotel)
    @Field(() => [Reaction], { nullable: true })
    reactions?: Reaction[];
}
