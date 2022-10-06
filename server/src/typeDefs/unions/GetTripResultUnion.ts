import { createUnionType } from 'type-graphql';
import { Trip } from 'models';
import { ResolverError } from 'typeDefs';

export const GetTripResult = createUnionType({
    name: 'GetTripResult',
    types: () => [Trip, ResolverError] as const,
    resolveType: value => {
        if ('id' in value) return Trip;
        if ('message' in value) return ResolverError;
        return undefined;
    }
});
