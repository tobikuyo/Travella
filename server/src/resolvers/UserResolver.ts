import { hash } from 'bcryptjs';
import { User } from 'models/User';
import { Arg, Mutation, Resolver } from 'type-graphql';
import { RegisterResult } from 'typeDefs/RegisterResult';
import { RegisterUserInput } from 'typeDefs/RegisterUserInput';

@Resolver()
export class UserResolver {
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
}
