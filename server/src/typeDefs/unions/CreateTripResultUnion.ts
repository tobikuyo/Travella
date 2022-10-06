import { createUnionType, Field, ID, ObjectType } from 'type-graphql';
import { ErrorMessage } from 'typeDefs';

@ObjectType()
class CreateTripSuccess {
    @Field(() => ID)
    id: string;
}

export const CreateTripResultUnion = createUnionType({
    name: 'CreateTripResult',
    types: () => [CreateTripSuccess, ErrorMessage] as const,
    resolveType: value => {
        if ('id' in value) return CreateTripSuccess;
        if ('message' in value) return ErrorMessage;
        return undefined;
    }
});
