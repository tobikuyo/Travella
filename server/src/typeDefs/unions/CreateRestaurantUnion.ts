import { createUnionType, Field, ID, ObjectType } from 'type-graphql';
import { ErrorMessage } from 'typeDefs/ErrorMessage';

@ObjectType()
export class CreateRestaurantSuccess {
    @Field(() => ID)
    id: string;
}

export const CreateRestaurantResult = createUnionType({
    name: 'CreateRestaurantResult',
    types: () => [CreateRestaurantSuccess, ErrorMessage] as const,
    resolveType: value => {
        if ('id' in value) return CreateRestaurantSuccess;
        if ('message' in value) return ErrorMessage;
        return undefined;
    }
});
