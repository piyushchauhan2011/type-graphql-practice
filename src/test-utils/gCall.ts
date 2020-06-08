import { graphql, GraphQLSchema } from "graphql";
import { createSchema } from "../modules/utils/createSchema";
import { Maybe } from "type-graphql";

let schema: GraphQLSchema;

export async function gCall({
  source,
  variableValues,
  userId,
}: {
  source: string;
  variableValues?: Maybe<{
    [key: string]: any;
  }>;
  userId?: number;
}) {
  if (!schema) {
    schema = await createSchema();
  }

  return graphql({
    schema,
    source,
    variableValues,
    contextValue: {
      req: {
        session: {
          userId,
        },
      },
      res: {
        clearCookie: jest.fn(),
      },
    },
  });
}
