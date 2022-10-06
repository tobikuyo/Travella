import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class ErrorMessage {
    @Field()
    message: string;
}
