import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class ResolverError {
    @Field()
    message: string;
}
