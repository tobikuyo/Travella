import { Field, ID, InputType } from 'type-graphql';
import { UserType } from 'typeDefs/enums/UserType';

@InputType()
export class CreateTempUserInput {
    @Field()
    name: string;

    @Field()
    email: string;

    @Field(() => UserType, { defaultValue: UserType.Temp })
    type: UserType;

    @Field(() => ID)
    tripId: string;
}
