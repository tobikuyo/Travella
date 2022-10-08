import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class ResolverSuccess {
    @Field()
    success: boolean;

    @Field()
    message: string;
}
