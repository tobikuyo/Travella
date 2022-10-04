import { createUnionType, Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
class RegisterSuccess {
    @Field(() => ID)
    id: string;

    @Field()
    success: boolean;
}

@ObjectType()
class RegisterError {
    @Field(() => ID)
    message: string;

    @Field()
    success: boolean;
}

export const RegisterResultUnion = createUnionType({
    name: 'RegisterResult',
    types: () => [RegisterSuccess, RegisterError] as const,
    resolveType: value => {
        if ('id' in value) return RegisterSuccess;
        if ('message' in value) return RegisterError;
        return undefined;
    }
});
