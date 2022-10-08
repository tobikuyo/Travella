import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class DeleteEntityResult {
    @Field()
    success: boolean;

    @Field()
    message: string;
}
