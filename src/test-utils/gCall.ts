import { graphql, GraphQLSchema } from "graphql";
import { createSchema } from "../modules/utils/createSchema";
import { Maybe } from "type-graphql";

let schema: GraphQLSchema;

export async function gCall({
  source,
  variableValues,
}: {
  source: string;
  variableValues?: Maybe<{
    [key: string]: any;
  }>;
}) {
  if (!schema) {
    schema = await createSchema();
  }

  return graphql({
    schema,
    source,
    variableValues,
  });
}
