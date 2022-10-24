import 'dotenv/config';
import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import { AppDataSource } from './data-source';
import { app } from './server';
import { createSchema } from 'helpers/createSchema';

const main = async () => {
    const apolloServer = new ApolloServer({
        schema: await createSchema(),
        context: ({ req, res }) => ({ req, res })
    });

    await AppDataSource.initialize();
    await apolloServer.start();
    apolloServer.applyMiddleware({ app, cors: false });

    const port = process.env.PORT || 4000;

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
};

main().catch(error => {
    console.error('Server Error:', error.message);
});
