import { Field, InputType, Int } from 'type-graphql';

@InputType()
export class CreateRestaurantInput {
    @Field()
    name: string;

    @Field()
    image: string;

    @Field()
    ranking: string;

    @Field({ nullable: true })
    description?: string;

    @Field({ nullable: true })
    rating: number;

    @Field(() => Int, { defaultValue: 0 })
    reviewCount: number;

    @Field({ nullable: true })
    priceRange?: string;

    @Field()
    address: string;

    @Field({ nullable: true })
    website?: string;

    @Field({ nullable: true })
    tripadvisorLink?: string;

    @Field(() => [String], { nullable: true })
    cuisine?: string[];
}
