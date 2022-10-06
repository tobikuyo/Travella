import { createUnionType } from 'type-graphql';
import { Trip } from 'models';
import { ErrorMessage } from 'typeDefs';

export const GetTripResult = createUnionType({
    name: 'GetTripResult',
    types: () => [Trip, ErrorMessage] as const,
    resolveType: value => {
        if ('id' in value) return Trip;
        if ('message' in value) return ErrorMessage;
        return undefined;
    }
});
