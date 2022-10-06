import { createUnionType, Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
class CreateTripSuccess {
    @Field(() => ID)
    id: string;
}

@ObjectType()
class CreateTripError {
    @Field()
    message: string;
}

export const CreateTripResultUnion = createUnionType({
    name: 'CreateTripResult',
    types: () => [CreateTripSuccess, CreateTripError] as const,
    resolveType: value => {
        if ('id' in value) return CreateTripSuccess;
        if ('message' in value) return CreateTripError;
        return undefined;
    }
});
