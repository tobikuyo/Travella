import { Field, InputType } from 'type-graphql';

@InputType()
export class CreateTripInput {
    @Field()
    destination: string;

    @Field()
    departureDate: Date;

    @Field()
    returnDate: Date;

    @Field(() => [String], { nullable: true })
    invitees?: string[];
}
