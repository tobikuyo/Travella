import { compare, hash } from 'bcryptjs';
import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';
import { checkAuthorization } from 'auth/checkAuthorization';
import { createAccessToken, createRefreshToken } from 'auth/createTokens';
import { AppContext } from 'interfaces/AppContext';
import { User } from 'models';
import { LoginResultUnion, RegisterResult, RegisterUserInput, UserType } from 'typeDefs';

@Resolver()
export class UserResolver {
    @Query(() => User)
    @UseMiddleware(checkAuthorization)
    async currentUser(@Ctx() { payload }: AppContext): Promise<User | null> {
        const id = payload?.id;
        const currentUser = await User.findOneBy({ id });
        return currentUser;
    }

    @Mutation(() => RegisterResult)
    async register(
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

    @Mutation(() => LoginResultUnion)
    async login(
        @Arg('email') email: string,
        @Arg('password') password: string,
        @Ctx() { res }: AppContext
    ): Promise<typeof LoginResultUnion> {
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
}
