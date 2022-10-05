import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class RegisterResult {
    @Field()
    success: boolean;

    @Field()
    message: string;
}
