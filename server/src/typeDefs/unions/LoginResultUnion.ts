import { createUnionType, Field, ObjectType } from 'type-graphql';
import { ErrorMessage } from 'typeDefs';

@ObjectType()
class LoginSuccess {
    @Field()
    accessToken: string;
}

export const LoginResultUnion = createUnionType({
    name: 'LoginResult',
    types: () => [LoginSuccess, ErrorMessage] as const,
    resolveType: value => {
        if ('accessToken' in value) return LoginSuccess;
        if ('message' in value) return ErrorMessage;
        return undefined;
    }
});
