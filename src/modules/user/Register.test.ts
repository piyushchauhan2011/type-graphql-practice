import { testConn } from "../../test-utils/testConn";
import { Connection } from "typeorm";
import { gCall } from "../../test-utils/gCall";

let conn: Connection;

beforeAll(async () => {
  conn = await testConn();
});

afterAll(async () => {
  await conn.close();
});

const registerMutation = `
mutation Register($data: RegisterInput!){
  register(
    data: $data
  ) {
    id
    firstName
    lastName
    email
    name
  }
}
`;

describe("Register", () => {
  test("create user", async () => {
    await gCall({
      source: registerMutation,
      variableValues: {
        data: {
          firstName: "fname1",
          lastName: "lname1",
          email: "fl1@gmail.com",
          password: "password1",
        },
      },
    });

    expect(true).toBe(true);
  });
});
