import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class ResolverError {
    @Field()
    message: string;

    @Field({ defaultValue: false })
    success?: boolean;
}
