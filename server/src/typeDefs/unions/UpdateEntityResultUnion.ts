import { createUnionType } from 'type-graphql';
import { ResolverError, ResolverSuccess } from 'typeDefs';

export const UpdateEntityResult = createUnionType({
    name: 'UpdateEntityResult',
    types: () => [ResolverSuccess, ResolverError] as const,
    resolveType: value => {
        if (value.success === true) return ResolverSuccess;
        if (value.success === false) return ResolverError;
        return undefined;
    }
});
