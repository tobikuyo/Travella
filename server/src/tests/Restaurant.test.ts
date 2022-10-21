import 'dotenv/config';
import { faker } from '@faker-js/faker';
import { getMockReq, getMockRes } from '@jest-mock/express';
import { Restaurant, Trip, User } from 'models';
import { TestDataSource } from 'test-utils/data-source';
import { graphqlCall } from 'test-utils/graphqlCall';
import {
    AddRestaurantMutation,
    DeleteRestaurantMutation
} from './mutations/RestaurantMutations';
import { CreateTripMutation } from './mutations/TripMutations';
import { LoginMutation, RegisterMutation } from './mutations/UserMutations';
import { GetRestaurantQuery } from './queries/RestaurantQueries';

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

// Fake restaurant data
const restaurantInput: Partial<Restaurant> = {
    name: faker.company.name(),
    image: faker.internet.avatar(),
    ranking: '#1 in the city',
    rating: faker.datatype.float({ min: 1, max: 5, precision: 0.1 }),
    address: faker.address.streetAddress()
};

let tripId: string;
let restaurantId: string;
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

    const { data: tripData } = await graphqlCall({
        source: CreateTripMutation,
        context: { req },
        variableValues: { input: tripInput }
    });

    tripId = tripData?.createTrip?.id;
    const dbTrip = await Trip.findOneBy({ id: tripId });
    if (dbTrip) trip = dbTrip;
});

afterAll(async () => {
    await TestDataSource.destroy();
});

describe('Restaurant', () => {
    it('adds a restaurant to a trip', async () => {
        const { data } = await graphqlCall({
            source: AddRestaurantMutation,
            context: { req, trip },
            variableValues: {
                input: {
                    ...restaurantInput,
                    tripId
                }
            }
        });

        const { id, success } = data?.addRestaurant;
        restaurantId = id;
        expect(id).toBeDefined();
        expect(success).toBe(true);
    });

    it('gets restaurant details', async () => {
        const { data } = await graphqlCall({
            source: GetRestaurantQuery,
            context: { req, trip },
            variableValues: { restaurantId, tripId }
        });

        const { name, image, address, rating } = data?.getRestaurant;
        expect(name).toBe(restaurantInput.name);
        expect(image).toBe(restaurantInput.image);
        expect(address).toBe(restaurantInput.address);
        expect(rating).toBe(restaurantInput.rating);
    });

    it('attempts to get details for a non-existing restaurant', async () => {
        const { data } = await graphqlCall({
            source: GetRestaurantQuery,
            context: { req, trip },
            variableValues: {
                restaurantId: faker.datatype.uuid(),
                tripId
            }
        });

        expect(data?.getRestaurant?.message).toContain(
            'There is no restaurant with the id'
        );
    });

    it('deletes a restaurant', async () => {
        const { data } = await graphqlCall({
            source: DeleteRestaurantMutation,
            context: { req },
            variableValues: { restaurantId }
        });

        const { success, message } = data?.deleteRestaurant;
        expect(success).toBe(true);
        expect(message).toBe(
            `Restaurant with id '${restaurantId}' was deleted successfully`
        );
    });

    it('attempts to delete a non-existing restaurant', async () => {
        const { data } = await graphqlCall({
            source: DeleteRestaurantMutation,
            context: { req },
            variableValues: {
                restaurantId: faker.datatype.uuid()
            }
        });

        const { success, message } = data?.deleteRestaurant;
        expect(success).toBe(false);
        expect(message).toContain(`There is no restaurant with the id`);
    });
});
