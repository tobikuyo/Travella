import { createUnionType } from 'type-graphql';
import { CreateEntitySuccess, ResolverError } from 'typeDefs';

export const CreateEntityResult = createUnionType({
    name: 'CreateEntityResult',
    types: () => [CreateEntitySuccess, ResolverError] as const,
    resolveType: value => {
        if ('id' in value) return CreateEntitySuccess;
        if ('message' in value) return ResolverError;
        return undefined;
    }
});
