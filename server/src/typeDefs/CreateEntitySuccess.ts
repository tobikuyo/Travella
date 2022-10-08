import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class CreateEntitySuccess {
    @Field(() => ID)
    id: string;

    @Field()
    success: boolean;
}
