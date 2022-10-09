import { createUnionType } from 'type-graphql';
import { Attraction } from 'models';
import { ResolverError } from 'typeDefs/ResolverError';

export const GetAttractionResult = createUnionType({
    name: 'GetAttractionResult',
    types: () => [Attraction, ResolverError] as const,
    resolveType: value => {
        if ('id' in value) return Attraction;
        if ('message' in value) return ResolverError;
        return undefined;
    }
});
