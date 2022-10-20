import 'dotenv/config';
import { faker } from '@faker-js/faker';
import { getMockRes, getMockReq } from '@jest-mock/express';
import { User } from 'models';
import { TestDataSource } from 'test-utils/data-source';
import { graphqlCall } from 'test-utils/graphqlCall';
import {
    LoginMutation,
    RegisterMutation
} from './mutations/UserMutations';

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

const req = getMockReq();
const { res } = getMockRes();

let accessToken: string;

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
});
