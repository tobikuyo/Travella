import { createUnionType, Field, ObjectType } from 'type-graphql';

@ObjectType()
class LoginSuccess {
    @Field()
    accessToken: string;
}

@ObjectType()
class LoginError {
    @Field()
    message: string;
}

export const LoginResultUnion = createUnionType({
    name: 'LoginResult',
    types: () => [LoginSuccess, LoginError] as const,
    resolveType: value => {
        if ('accessToken' in value) return LoginSuccess;
        if ('message' in value) return LoginError;
        return undefined;
    }
});
