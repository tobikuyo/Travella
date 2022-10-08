import { Field, InputType } from 'type-graphql';
import { Trip } from 'models';

@InputType()
export class UpdateTripInput implements Partial<Trip> {
    @Field({ nullable: true })
    destination?: string;

    @Field({ nullable: true })
    departureDate?: Date;

    @Field({ nullable: true })
    returnDate?: Date;

    @Field(() => [String], { nullable: true })
    invitees?: string[];
}
