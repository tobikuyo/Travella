import { createUnionType, Field, ObjectType } from 'type-graphql';
import { Trip } from 'models';

@ObjectType()
export class GetTripError {
    @Field()
    message: string;
}

export const GetTripResultUnion = createUnionType({
    name: 'GetTripResult',
    types: () => [Trip, GetTripError] as const,
    resolveType: value => {
        if ('id' in value) return Trip;
        if ('message' in value) return GetTripError;
        return undefined;
    }
});
