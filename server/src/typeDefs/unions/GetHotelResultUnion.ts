import { createUnionType } from 'type-graphql';
import { Hotel } from 'models';
import { ResolverError } from 'typeDefs/ResolverError';

export const GetHotelResult = createUnionType({
    name: 'GetHotelResult',
    types: () => [Hotel, ResolverError] as const,
    resolveType: value => {
        if ('id' in value) return Hotel;
        if ('message' in value) return ResolverError;
        return undefined;
    }
});
