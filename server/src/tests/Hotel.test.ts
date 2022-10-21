import 'dotenv/config';
import { faker } from '@faker-js/faker';
import { getMockReq, getMockRes } from '@jest-mock/express';
import { Hotel, Trip, User } from 'models';
import { TestDataSource } from 'test-utils/data-source';
import { graphqlCall } from 'test-utils/graphqlCall';
import { AddHotelMutation, DeleteHotelMutation } from './mutations/HotelMutations';
import { CreateTripMutation } from './mutations/TripMutations';
import { LoginMutation, RegisterMutation } from './mutations/UserMutations';
import { GetHotelQuery } from './queries/HotelQueries';

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

// Fake hotel data
const hotelInput: Partial<Hotel> = {
    name: faker.company.name(),
    image: faker.internet.avatar(),
    ranking: '#1 in the city',
    rating: faker.datatype.float({ min: 1, max: 5, precision: 0.1 }),
    address: faker.address.streetAddress()
};

let tripId: string;
let hotelId: string;
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

describe('Hotel', () => {
    it('adds a hotel to a trip', async () => {
        const { data } = await graphqlCall({
            source: AddHotelMutation,
            context: { req, trip },
            variableValues: {
                input: {
                    ...hotelInput,
                    tripId
                }
            }
        });

        const { id, success } = data?.addHotel;
        hotelId = id;
        expect(id).toBeDefined();
        expect(success).toBe(true);
    });

    it('gets hotel details', async () => {
        const { data } = await graphqlCall({
            source: GetHotelQuery,
            context: { req, trip },
            variableValues: { hotelId, tripId }
        });

        const { name, image, address, rating } = data?.getHotel;
        expect(name).toBe(hotelInput.name);
        expect(image).toBe(hotelInput.image);
        expect(address).toBe(hotelInput.address);
        expect(rating).toBe(hotelInput.rating);
    });

    it('attempts to get details for a non-existing hotel', async () => {
        const { data } = await graphqlCall({
            source: GetHotelQuery,
            context: { req, trip },
            variableValues: {
                hotelId: faker.datatype.uuid(),
                tripId
            }
        });

        expect(data?.getHotel?.message).toContain('There is no hotel with the id');
    });

    it('deletes a hotel', async () => {
        const { data } = await graphqlCall({
            source: DeleteHotelMutation,
            context: { req },
            variableValues: { hotelId }
        });

        const { success, message } = data?.deleteHotel;
        expect(success).toBe(true);
        expect(message).toBe(`Hotel with id '${hotelId}' was deleted successfully`);
    });

    it('attempts to delete a non-existing hotel', async () => {
        const { data } = await graphqlCall({
            source: DeleteHotelMutation,
            context: { req },
            variableValues: {
                hotelId: faker.datatype.uuid()
            }
        });

        const { success, message } = data?.deleteHotel;
        expect(success).toBe(false);
        expect(message).toContain(`There is no hotel with the id`);
    });
});
