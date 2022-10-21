import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class CreateEntity {
    @Field(() => ID)
    id: string;

    @Field()
    success: boolean;
}
