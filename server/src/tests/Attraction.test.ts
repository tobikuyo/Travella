import 'dotenv/config';
import { faker } from '@faker-js/faker';
import { getMockReq, getMockRes } from '@jest-mock/express';
import { Attraction, Trip, User } from 'models';
import { TestDataSource } from 'test-utils/data-source';
import { graphqlCall } from 'test-utils/graphqlCall';
import {
    AddAttractionMutation,
    DeleteAttractionMutation
} from './mutations/AttractionMutations';
import { CreateTripMutation } from './mutations/TripMutations';
import { LoginMutation, RegisterMutation } from './mutations/UserMutations';
import { GetAttractionQuery } from './queries/AttractionQueries';

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

// Fake attraction data
const attractionInput: Partial<Attraction> = {
    name: faker.company.name(),
    image: faker.internet.avatar(),
    ranking: '#1 in the city',
    rating: faker.datatype.float({ min: 1, max: 5, precision: 0.1 }),
    address: faker.address.streetAddress()
};

let tripId: string;
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

describe('Attraction', () => {
    it('adds an attraction to a trip', async () => {
        const { data } = await graphqlCall({
            source: AddAttractionMutation,
            context: { req, trip },
            variableValues: {
                input: {
                    ...attractionInput,
                    tripId
                }
            }
        });

        const { id, success } = data?.addAttraction;
        attractionId = id;
        expect(id).toBeDefined();
        expect(success).toBe(true);
    });

    it('gets attraction details', async () => {
        const { data } = await graphqlCall({
            source: GetAttractionQuery,
            context: { req, trip },
            variableValues: { attractionId, tripId }
        });

        const { name, image, address, rating, awards } = data?.getAttraction;
        expect(name).toBe(attractionInput.name);
        expect(image).toBe(attractionInput.image);
        expect(address).toBe(attractionInput.address);
        expect(rating).toBe(attractionInput.rating);
        expect(awards).toBeNull();
    });

    it('attempts to get details for a non-existing attraction', async () => {
        const { data } = await graphqlCall({
            source: GetAttractionQuery,
            context: { req, trip },
            variableValues: {
                attractionId: faker.datatype.uuid(),
                tripId
            }
        });

        expect(data?.getAttraction?.message).toContain(
            'There is no attraction with the id'
        );
    });

    it('deletes an attraction', async () => {
        const { data } = await graphqlCall({
            source: DeleteAttractionMutation,
            context: { req },
            variableValues: { attractionId }
        });

        const { success, message } = data?.deleteAttraction;
        expect(success).toBe(true);
        expect(message).toBe(
            `Attraction with id '${attractionId}' was deleted successfully`
        );
    });

    it('attempts to delete a non-existing attraction', async () => {
        const { data } = await graphqlCall({
            source: DeleteAttractionMutation,
            context: { req },
            variableValues: {
                attractionId: faker.datatype.uuid()
            }
        });

        const { success, message } = data?.deleteAttraction;
        expect(success).toBe(false);
        expect(message).toContain(`There is no attraction with the id`);
    });
});
