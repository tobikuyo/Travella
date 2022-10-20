import { createUnionType } from 'type-graphql';
import { User } from 'models';
import { ResolverError } from 'typeDefs/ResolverError';

export const GetUserResult = createUnionType({
    name: 'GetUserResult',
    types: () => [User, ResolverError] as const,
    resolveType: value => {
        if ('id' in value) return User;
        if ('message' in value) return ResolverError;
        return undefined;
    }
});
