import 'dotenv/config';
import { faker } from '@faker-js/faker';
import { getMockReq, getMockRes } from '@jest-mock/express';
import { TestDataSource } from 'test-utils/data-source';
import { graphqlCall } from 'test-utils/graphqlCall';
import { CreateTripMutation } from './mutations/TripMutations';
import { LoginMutation, RegisterMutation } from './mutations/UserMutations';
import { GetTripQuery } from './queries/TripQueries';
import { Trip } from 'models';

const user = {
    name: faker.name.firstName(),
    email: faker.internet.email(),
    password: faker.internet.password()
};

const tripInput = {
    destination: faker.address.cityName(),
    departureDate: faker.date.recent(2).toISOString(),
    returnDate: faker.date.soon(10).toISOString()
};

let tripId: string;
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
});

afterAll(async () => {
    await TestDataSource.destroy();
});

describe('Trip Success', () => {
    it('creates a trip', async () => {
        const { data } = await graphqlCall({
            source: CreateTripMutation,
            context: { req },
            variableValues: { input: tripInput }
        });

        tripId = data?.createTrip?.id;
        expect(data?.createTrip?.id).toBeDefined();
    });

    it('get trip details', async () => {
        const { data } = await graphqlCall({
            source: GetTripQuery,
            context: {
                req,
                trip: {} as Trip
            },
            variableValues: { tripId }
        });

        const { destination, departureDate, createdAt, comments } = data?.getTrip;
        expect(destination).toBe(tripInput.destination);
        expect(departureDate).toBe(tripInput.departureDate);
        expect(createdAt).toBeDefined();
        expect(comments.length).toEqual(0);
    });
});
