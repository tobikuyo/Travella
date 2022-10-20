import 'dotenv/config';
import { faker } from '@faker-js/faker';
import { getMockRes, getMockReq } from '@jest-mock/express';
import { User } from 'models';
import { TestDataSource } from 'test-utils/data-source';
import { graphqlCall } from 'test-utils/graphqlCall';
import { CreateTripMutation } from './mutations/TripMutations';
import { LoginMutation, RegisterMutation } from './mutations/UserMutations';
import { GetCurrentUserQuery, GetUserQuery } from './queries/UserQueries';

const user = {
    name: faker.name.firstName(),
    email: faker.internet.email(),
    password: faker.internet.password()
};

const tempUser = {
    name: faker.name.firstName(),
    email: faker.internet.email(),
    type: 'Temp'
};

const tripInput = {
    destination: faker.address.cityName(),
    departureDate: faker.date.recent(2).toISOString(),
    returnDate: faker.date.soon(10).toISOString(),
    invitees: [tempUser.email]
};

const req = getMockReq();
const { res } = getMockRes();

let accessToken: string;
let tripId: string;

beforeAll(async () => {
    await TestDataSource.initialize();
});

beforeEach(() => {
    req.headers = { authorization: `Bearer ${accessToken}` };
});

afterAll(async () => {
    await TestDataSource.destroy();
});

describe('User Success', () => {
    it('registers a user', async () => {
        const { data } = await graphqlCall({
            source: RegisterMutation,
            variableValues: {
                registerInput: user
            }
        });

        const { message, success } = data?.registerUser;
        expect(message).toBe('User was registered successfully');
        expect(success).toBe(true);

        const createdUser = await User.findOneBy({ email: user.email });
        expect(createdUser?.name).toBe(user.name);
        expect(createdUser?.password).not.toBe(user.password);
        expect(createdUser?.password).toContain('$12');
    });

    it('logs in user', async () => {
        const { data } = await graphqlCall({
            source: LoginMutation,
            context: { res },
            variableValues: {
                email: user?.email,
                password: user?.password
            }
        });

        accessToken = data?.loginUser?.accessToken;

        expect(accessToken).toBeDefined();
        expect(res.cookie).toBeCalled();
    });

    it('gets details for current user', async () => {
        const { data } = await graphqlCall({
            source: GetCurrentUserQuery,
            context: { req }
        });

        const { id, name, email, type, createdAt } = data?.getCurrentUser;
        expect(id).toBeDefined();
        expect(name).toBe(user.name);
        expect(email).toBe(user.email);
        expect(type).toBe('Registered');
        expect(createdAt).toBeDefined();
    });

    it('gets details for a user', async () => {
        // Create trip for 'TripExists' middleware
        const { data: tripData } = await graphqlCall({
            source: CreateTripMutation,
            context: { req },
            variableValues: { input: tripInput }
        });

        tripId = tripData?.createTrip?.id;
        const databaseUser = await User.findOneBy({ email: user.email });

        const { data } = await graphqlCall({
            source: GetUserQuery,
            context: { req },
            variableValues: { input: { userId: databaseUser?.id, tripId } }
        });

        const { name, email, type } = data?.getUser;
        expect(name).toBe(user.name);
        expect(email).toBe(user.email);
        expect(type).toBe('Registered');
    });
});
