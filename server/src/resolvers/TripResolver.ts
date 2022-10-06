import { Arg, Query, Resolver } from 'type-graphql';
import { GetTripResultUnion } from 'typeDefs/unions/GetTripResultUnion';
import { getTrip } from 'helpers/getTrip';

@Resolver()
export class TripResolver {
    // Get trip details
    @Query(() => GetTripResultUnion)
    async getTrip(@Arg('id') id: string): Promise<typeof GetTripResultUnion> {
        const trip = await getTrip(id);
        if (trip) return trip;
        return { message: `There is no trip with the id '${id}'` };
    }
}
