import { graphql, GraphQLSchema } from 'graphql';
import { Maybe } from 'type-graphql';
import { createSchema } from 'helpers/createSchema';
import { AppContext } from 'interfaces/AppContext';

interface Options {
    source: string;
    variableValues?: Maybe<{
        [key: string]: any;
    }>;
    context?: Partial<AppContext>;
}

let schema: GraphQLSchema;

export const graphqlCall = async ({ source, variableValues, context }: Options) => {
    if (!schema) schema = await createSchema();

    return graphql({
        schema,
        source,
        variableValues,
        contextValue: context
    });
};
