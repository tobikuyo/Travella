import { createUnionType } from 'type-graphql';
import { CreateEntity, ResolverError } from 'typeDefs';

export const CreateTripResult = createUnionType({
    name: 'CreateTripResult',
    types: () => [CreateEntity, ResolverError] as const,
    resolveType: value => {
        if ('id' in value) return CreateEntity;
        if ('message' in value) return ResolverError;
        return undefined;
    }
});
