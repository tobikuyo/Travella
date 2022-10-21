import 'dotenv/config';
import { faker } from '@faker-js/faker';
import { getMockReq, getMockRes } from '@jest-mock/express';
import { Restaurant, Trip, User } from 'models';
import { TestDataSource } from 'test-utils/data-source';
import { graphqlCall } from 'test-utils/graphqlCall';
import { LoginMutation, RegisterMutation } from './mutations/UserMutations';
import { AddAttractionMutation } from './mutations/AttractionMutations';
import { AddHotelMutation } from './mutations/HotelMutations';
import { AddRestaurantMutation } from './mutations/RestaurantMutations';
import { CreateTripMutation } from './mutations/TripMutations';
import {
    AddReactionMutation,
    DeleteReactionMutation
} from './mutations/ReactionMutations';
import { GetReactionQuery } from './queries/ReactionQueries';

// Fake user data
const user: Partial<User> = {
    name: faker.name.firstName(),
    email: faker.internet.email(),
    password: faker.internet.password()
};

// Fake trip data
const tripInput = {
    destination: faker.address.cityName(),
    departureDate: faker.date.recent(2).toISOString(),
    returnDate: faker.date.soon(10).toISOString()
};

// Fake experience data
const experienceInput: Partial<Restaurant> = {
    name: faker.company.name(),
    image: faker.internet.avatar(),
    ranking: '#1 in the city',
    rating: faker.datatype.float({ min: 1, max: 5, precision: 0.1 }),
    address: faker.address.streetAddress()
};

let tripId: string;
let reactionId: string;
let restaurantId: string;
let hotelId: string;
let attractionId: string;
let trip: Trip;
const req = getMockReq();

beforeAll(async () => {
    await TestDataSource.initialize();

    // Register user
    await graphqlCall({
        source: RegisterMutation,
        variableValues: {
            registerInput: user
        }
    });

    // Login user
    const { res } = getMockRes();
    const { data } = await graphqlCall({
        source: LoginMutation,
        context: { res },
        variableValues: {
            email: user?.email,
            password: user?.password
        }
    });

    const accessToken = data?.loginUser?.accessToken;
    req.headers = { authorization: `Bearer ${accessToken}` };

    // Create trip
    const { data: tripData } = await graphqlCall({
        source: CreateTripMutation,
        context: { req },
        variableValues: { input: tripInput }
    });

    tripId = tripData?.createTrip?.id;
    const dbTrip = await Trip.findOne({ relations: ['creator'], where: { id: tripId } });
    if (dbTrip) trip = dbTrip;

    // Add restaurant to trip
    const { data: restaurantData } = await graphqlCall({
        source: AddRestaurantMutation,
        context: { req, trip },
        variableValues: {
            input: {
                ...experienceInput,
                tripId
            }
        }
    });

    // Add hotel to trip
    const { data: hotelData } = await graphqlCall({
        source: AddHotelMutation,
        context: { req, trip },
        variableValues: {
            input: {
                ...experienceInput,
                tripId
            }
        }
    });

    // Add attraction to trip
    const { data: attractionData } = await graphqlCall({
        source: AddAttractionMutation,
        context: { req, trip },
        variableValues: {
            input: {
                ...experienceInput,
                tripId
            }
        }
    });

    restaurantId = restaurantData?.addRestaurant?.id;
    hotelId = hotelData?.addHotel?.id;
    attractionId = attractionData?.addAttraction?.id;
});

afterAll(async () => {
    await TestDataSource.destroy();
});

describe('Reaction', () => {
    it('adds a reaction to the restaurant', async () => {
        const { data } = await graphqlCall({
            source: AddReactionMutation,
            context: { req, trip },
            variableValues: {
                type: 'restaurant',
                experienceId: restaurantId,
                tripId
            }
        });

        const { id, success } = data?.addReaction;
        reactionId = id;
        expect(id).toBeDefined();
        expect(success).toBe(true);
    });

    it('adds a reaction to the hotel', async () => {
        const { data } = await graphqlCall({
            source: AddReactionMutation,
            context: { req, trip },
            variableValues: {
                type: 'hotel',
                experienceId: hotelId,
                tripId
            }
        });

        const { id, success } = data?.addReaction;
        expect(id).toBeDefined();
        expect(success).toBe(true);
    });

    it('adds a reaction to the attraction', async () => {
        const { data } = await graphqlCall({
            source: AddReactionMutation,
            context: { req, trip },
            variableValues: {
                type: 'attraction',
                experienceId: attractionId,
                tripId
            }
        });

        const { id, success } = data?.addReaction;
        expect(id).toBeDefined();
        expect(success).toBe(true);
    });

    it('gets reaction details', async () => {
        const { data } = await graphqlCall({
            source: GetReactionQuery,
            context: { req, trip },
            variableValues: { reactionId }
        });

        const { like, user } = data?.getReaction;
        const reactionUser: User = JSON.parse(JSON.stringify(user));
        expect(like).toBe(true);
        expect(reactionUser.name).toBe(user.name);
        expect(reactionUser.email).toBe(user.email);
    });

    it('attempts to get reaction details as a non-invited user', async () => {
        const { data } = await graphqlCall({
            source: GetReactionQuery,
            context: { req, trip },
            variableValues: {
                reactionId,
                invitedUserEmail: faker.internet.email()
            }
        });

        expect(data?.getReaction?.message).toContain(
            'You are not authorised to view or make any changes'
        );
    });

    it('attempts to get details for a non-existing reaction', async () => {
        const { data } = await graphqlCall({
            source: GetReactionQuery,
            context: { req, trip },
            variableValues: {
                reactionId: faker.datatype.uuid()
            }
        });

        expect(data?.getReaction?.message).toContain('There is no reaction with the id');
    });

    it('deletes a reaction', async () => {
        const { data } = await graphqlCall({
            source: DeleteReactionMutation,
            context: { req },
            variableValues: { reactionId }
        });

        const { success, message } = data?.deleteReaction;
        expect(success).toBe(true);
        expect(message).toBe(`Reaction with id '${reactionId}' was deleted successfully`);
    });

    it('attempts to delete a non-existing reaction', async () => {
        const { data } = await graphqlCall({
            source: DeleteReactionMutation,
            context: { req },
            variableValues: {
                reactionId: faker.datatype.uuid()
            }
        });

        const { success, message } = data?.deleteReaction;
        expect(success).toBe(false);
        expect(message).toContain(`There is no reaction with the id`);
    });

    it('attempts to get reaction details with invalid token', async () => {
        req.headers = {};

        const { errors } = await graphqlCall({
            source: GetReactionQuery,
            context: { req, trip },
            variableValues: { reactionId }
        });

        expect(errors).toHaveLength(1);
    });
});
