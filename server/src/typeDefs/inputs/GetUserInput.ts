import { Field, ID, InputType } from 'type-graphql';

@InputType()
export class GetUserInput {
    @Field(() => ID)
    userId: string;

    @Field(() => ID)
    tripId: string;

    @Field({ nullable: true })
    email?: string;
}
