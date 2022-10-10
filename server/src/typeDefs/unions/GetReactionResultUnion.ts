import { Reaction } from 'models';
import { createUnionType } from 'type-graphql';
import { ResolverError } from 'typeDefs/ResolverError';

export const GetReactionResult = createUnionType({
    name: 'GetReactionResult',
    types: () => [Reaction, ResolverError] as const,
    resolveType: value => {
        if ('id' in value) return Reaction;
        if ('message' in value) return ResolverError;
        return undefined;
    }
});
