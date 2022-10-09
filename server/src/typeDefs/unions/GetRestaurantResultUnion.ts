import { createUnionType } from 'type-graphql';
import { Restaurant } from 'models';
import { ResolverError } from 'typeDefs/ResolverError';

export const GetRestaurantResult = createUnionType({
    name: 'GetRestaurantResult',
    types: () => [Restaurant, ResolverError] as const,
    resolveType: value => {
        if ('id' in value) return Restaurant;
        if ('message' in value) return ResolverError;
        return undefined;
    }
});
