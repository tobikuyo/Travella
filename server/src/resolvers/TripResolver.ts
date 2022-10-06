import { Arg, Query, Resolver } from 'type-graphql';
import { GetTripResult } from 'typeDefs/unions';
import { getTrip } from 'helpers/getTrip';

@Resolver()
export class TripResolver {
    // Get trip details
    @Query(() => GetTripResult)
    async getTrip(@Arg('id') id: string): Promise<typeof GetTripResult> {
        const trip = await getTrip(id);
        if (trip) return trip;
        return { message: `There is no trip with the id '${id}'` };
    }
}
