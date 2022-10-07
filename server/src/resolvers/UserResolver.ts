import { compare, hash } from 'bcryptjs';
import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';
import { createAccessToken, createRefreshToken } from 'helpers/createTokens';
import { AppContext } from 'interfaces/AppContext';
import { checkUserAuthorization } from 'middleware';
import { Trip, User } from 'models';
import { RegisterResult } from 'typeDefs';
import { UserType } from 'typeDefs/enums/UserType';
import { CreateTripInput, RegisterUserInput } from 'typeDefs/inputs';
import { CreateEntityResult, LoginResult } from 'typeDefs/unions';

@Resolver()
export class UserResolver {
    // Get logged in user's details
    @Query(() => User)
    @UseMiddleware(checkUserAuthorization)
    async getCurrentUser(@Ctx() { currentUser }: AppContext): Promise<User | null> {
        if (!currentUser) return null;
        return currentUser;
    }

    // Register new user
    @Mutation(() => RegisterResult)
    async registerUser(
        @Arg('input') registerInput: RegisterUserInput
    ): Promise<RegisterResult> {
        try {
            const { email, password } = registerInput;
            const existingUser = await User.findOneBy({ email });
            if (existingUser) throw new Error('This email has already been registered');

            const hashedPassword = await hash(password, 12);
            await User.insert({ ...registerInput, password: hashedPassword });
            return { success: true, message: 'User was registered successfully' };
        } catch (error) {
            console.error('Register User Error', error);
            return { success: false, message: error.message };
        }
    }

    // Login user
    @Mutation(() => LoginResult)
    async loginUser(
        @Arg('email') email: string,
        @Arg('password') password: string,
        @Ctx() { res }: AppContext
    ): Promise<typeof LoginResult> {
        try {
            const user = await User.findOneBy({ email });
            if (!user) throw new Error('There is no  user with this email');
            if (user.type === UserType.Temp) {
                throw new Error("You can't sign in with a temporary account");
            }

            const validPassword = await compare(password, user.password!);
            if (!validPassword) throw new Error('Incorrect password');

            res.cookie('gid', createRefreshToken(user), { httpOnly: true });
            return { accessToken: createAccessToken(user) };
        } catch (error) {
            console.error('Login User Error', error);
            return { message: error.message };
        }
    }

    // Create trip
    @Mutation(() => CreateEntityResult)
    @UseMiddleware(checkUserAuthorization)
    async createTrip(
        @Arg('input') createTripInput: CreateTripInput,
        @Ctx() { currentUser }: AppContext
    ) {
        try {
            const tripInsertResult = await Trip.insert({
                ...createTripInput,
                creator: currentUser
            });
            const { id } = tripInsertResult.identifiers[0];
            return { id };
        } catch (error) {
            console.error('Create Trip Error', error);
            return { message: error.message };
        }
    }
}
