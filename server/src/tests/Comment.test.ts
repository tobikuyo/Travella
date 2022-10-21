import 'dotenv/config';
import { faker } from '@faker-js/faker';
import { getMockReq, getMockRes } from '@jest-mock/express';
import { Comment, Trip, User } from 'models';
import { TestDataSource } from 'test-utils/data-source';
import { graphqlCall } from 'test-utils/graphqlCall';
import {
    AddCommentMutation,
    DeleteCommentMutation,
    UpdateCommentMutation
} from './mutations/CommentMutations';
import { CreateTripMutation } from './mutations/TripMutations';
import { LoginMutation, RegisterMutation } from './mutations/UserMutations';

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

// Fake comment data
const commentInput: Partial<Comment> = {
    text: faker.lorem.sentence(6)
};

let tripId: string;
let commentId: string;
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

describe('Comment', () => {
    it('adds a comment to a trip', async () => {
        const { data } = await graphqlCall({
            source: AddCommentMutation,
            context: { req, trip },
            variableValues: {
                input: {
                    ...commentInput,
                    tripId
                }
            }
        });

        const { id, success } = data?.addComment;
        commentId = id;
        expect(id).toBeDefined();
        expect(success).toBe(true);
    });

    it('updates a comment', async () => {
        const { data } = await graphqlCall({
            source: UpdateCommentMutation,
            context: { req },
            variableValues: {
                commentId,
                text: faker.lorem.sentence(6)
            }
        });

        const { success, message } = data?.updateComment;
        expect(success).toBe(true);
        expect(message).toBe('Comment was updated successfully');
    });

    it('attempts to update a non-existing comment', async () => {
        const { data } = await graphqlCall({
            source: UpdateCommentMutation,
            context: { req },
            variableValues: {
                commentId: faker.datatype.uuid(),
                text: faker.lorem.sentence(6)
            }
        });

        expect(data?.updateComment.message).toContain('There is no comment with the id');
    });

    it('deletes a comment', async () => {
        const { data } = await graphqlCall({
            source: DeleteCommentMutation,
            context: { req },
            variableValues: { commentId }
        });

        const { success, message } = data?.deleteComment;
        expect(success).toBe(true);
        expect(message).toBe(`Comment with id '${commentId}' was deleted successfully`);
    });

    it('attempts to delete a non-existing comment', async () => {
        const { data } = await graphqlCall({
            source: DeleteCommentMutation,
            context: { req },
            variableValues: {
                commentId: faker.datatype.uuid()
            }
        });

        const { success, message } = data?.deleteComment;
        expect(success).toBe(false);
        expect(message).toContain(`There is no comment with the id`);
    });
});
