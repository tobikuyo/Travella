import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';
import { AppContext } from 'interfaces/AppContext';
import {
    AuthorizedMembers,
    EntityCreator,
    TripExists,
    UserAuthorization
} from 'middleware';
import { Hotel } from 'models';
import { CreateEntity, DeleteEntityResult } from 'typeDefs';
import { CreateExperienceInput } from 'typeDefs/inputs';
import { GetHotelResult } from 'typeDefs/unions';

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
            const hotel = await Hotel.findOne({
                where: { id },
                relations: { reactions: true, trip: true }
            });

            if (hotel) return hotel;
            throw new Error(`There is no hotel with the id '${id}'`);
        } catch (error) {
            console.error('Get Hotel Error:', error.message);
            return { message: error.message };
        }
    }

    // Add hotel to trip
    @Mutation(() => CreateEntity)
    @UseMiddleware(TripExists, UserAuthorization, AuthorizedMembers)
    async addHotel(
        @Ctx() { trip }: AppContext,
        @Arg('input') hotelInput: CreateExperienceInput,
        @Arg('invitedUserEmail', { nullable: true }) _invitedUserEmail?: string
    ): Promise<CreateEntity> {
        const hotel = await Hotel.insert({ ...hotelInput, trip });
        const { id } = hotel.identifiers[0];
        return { id, success: true };
    }

    // Delete hotel
    @Mutation(() => DeleteEntityResult)
    @UseMiddleware(UserAuthorization, EntityCreator)
    async deleteHotel(
        @Arg('id') id: string,
        @Arg('type', { defaultValue: 'hotel' }) _type: string
    ): Promise<DeleteEntityResult> {
        try {
            const hotel = await Hotel.findOneBy({ id });
            if (!hotel) {
                throw new Error(`There is no hotel with the id '${id}'`);
            }

            await Hotel.delete({ id });
            return {
                success: true,
                message: `Hotel with id '${id}' was deleted successfully`
            };
        } catch (error) {
            console.error('Delete Hotel Error:', error.message);
            return { success: false, message: error.message };
        }
    }
}
