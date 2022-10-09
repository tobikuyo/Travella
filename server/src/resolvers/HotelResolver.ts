import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';
import { AppContext } from 'interfaces/AppContext';
import {
    AuthorizedMembers,
    TripCreator,
    TripExists,
    UserAuthorization
} from 'middleware';
import { Hotel } from 'models';
import { DeleteEntityResult } from 'typeDefs';
import { CreateExperienceInput } from 'typeDefs/inputs';
import { CreateEntityResult, GetHotelResult } from 'typeDefs/unions';

@Resolver()
export class HotelResolver {
    // Get hotel
    @Query(() => GetHotelResult)
    @UseMiddleware(TripExists, UserAuthorization, AuthorizedMembers)
    async getHotel(
        @Arg('hotelId') id: string,
        @Arg('tripId') _tripId: string,
        @Arg('invitedUserEmail', { nullable: true }) _invitedUserEmail?: string
    ): Promise<typeof GetHotelResult> {
        try {
            const hotel = await Hotel.findOneBy({ id });
            if (hotel) return hotel;
            throw new Error(`There is no hotel with the id '${id}'`);
        } catch (error) {
            console.error('Get Hotel Error:', error);
            return { message: error.message };
        }
    }

    // Add hotel to trip
    @Mutation(() => CreateEntityResult)
    @UseMiddleware(TripExists, UserAuthorization, AuthorizedMembers)
    async addHotel(
        @Ctx() { trip }: AppContext,
        @Arg('input') hotelInput: CreateExperienceInput,
        @Arg('invitedUserEmail', { nullable: true }) _invitedUserEmail?: string
    ): Promise<typeof CreateEntityResult> {
        try {
            const hotel = await Hotel.insert({ ...hotelInput, trip });
            const { id } = hotel.identifiers[0];
            return { id, success: true };
        } catch (error) {
            console.error('Create Hotel Error:', error);
            return { message: error.message };
        }
    }

    // Delete hotel
    @Mutation(() => DeleteEntityResult)
    @UseMiddleware(UserAuthorization, TripCreator)
    async deleteHotel(
        @Arg('id') id: string,
        @Arg('type', { defaultValue: 'hotel' }) _type: string
    ): Promise<DeleteEntityResult> {
        try {
            await Hotel.delete({ id });
            return {
                success: true,
                message: `Hotel with id '${id} was deleted successfully`
            };
        } catch (error) {
            console.error('Delete Hotel Error:', error);
            return { success: false, message: error.message };
        }
    }
}
