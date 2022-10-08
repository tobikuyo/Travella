import { Field, ID, InputType } from 'type-graphql';

@InputType()
export class CreateCommentInput {
    @Field()
    text: string;

    @Field(() => ID)
    tripId: string;
}
