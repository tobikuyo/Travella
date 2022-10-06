import { createUnionType, Field, ObjectType } from 'type-graphql';
import { ResolverError } from 'typeDefs';

@ObjectType()
class LoginSuccess {
    @Field()
    accessToken: string;
}

export const LoginResult = createUnionType({
    name: 'LoginResult',
    types: () => [LoginSuccess, ResolverError] as const,
    resolveType: value => {
        if ('accessToken' in value) return LoginSuccess;
        if ('message' in value) return ResolverError;
        return undefined;
    }
});
