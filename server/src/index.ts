import 'dotenv/config';
import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import {
    AttractionResolver,
    CommentResolver,
    HotelResolver,
    ReactionResolver,
    RestaurantResolver,
    TripResolver,
    UserResolver
} from 'resolvers';
import { AppDataSource } from './data-source';
import { app } from './server';

const main = async () => {
    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [
                AttractionResolver,
                CommentResolver,
                HotelResolver,
                ReactionResolver,
                RestaurantResolver,
                TripResolver,
                UserResolver
            ],
            validate: false
        }),
        context: ({ req, res }) => ({ req, res })
    });

    await AppDataSource.initialize();
    await apolloServer.start();
    apolloServer.applyMiddleware({ app });

    const port = process.env.PORT || 4000;

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
};

main().catch(error => {
    console.error('Server Error =>', error);
});
