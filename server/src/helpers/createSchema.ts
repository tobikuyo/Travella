import { buildSchema } from 'type-graphql';

export const createSchema = () => {
    return buildSchema({
        resolvers: [__dirname + '/../resolvers/[^index]*.ts'],
        validate: false
    });
};
