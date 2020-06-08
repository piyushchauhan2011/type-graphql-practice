import { testConn } from "../../test-utils/testConn";
import { Connection } from "typeorm";
import { gCall } from "../../test-utils/gCall";
import faker from "faker";
import { User } from "../../entity/User";

let conn: Connection;

beforeAll(async () => {
  conn = await testConn();
});

afterAll(async () => {
  await conn.close();
});

const meQuery = `
{
  me {
    id
    firstName
    lastName
    email
    name
  }
}
`;

describe("Me", () => {
  test("get user", async () => {
    const user = await User.create({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    }).save();

    const response = await gCall({
      source: meQuery,
      userId: user.id,
    });
    expect(response).toMatchObject({
      data: {
        me: {
          id: `${user.id}`,
          firstName: user.firstName,
          lastName: user.lastName,
        },
      },
    });
  });

  test("null user when not logged in", async () => {
    const response = await gCall({
      source: meQuery,
    });
    expect(response).toMatchObject({
      data: {
        me: null,
      },
    });
  });
});
