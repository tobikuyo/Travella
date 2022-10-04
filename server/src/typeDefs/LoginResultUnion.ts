import { createUnionType, Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
class LoginSuccess {
    @Field()
    token: string;
}

@ObjectType()
class LoginError {
    @Field(() => ID)
    message: string;
}

export const LoginResultUnion = createUnionType({
    name: 'LoginResult',
    types: () => [LoginSuccess, LoginError] as const,
    resolveType: value => {
        if ('token' in value) return LoginSuccess;
        if ('message' in value) return LoginError;
        return undefined;
    }
});
