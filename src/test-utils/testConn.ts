import { createConnection, ConnectionOptions } from "typeorm";
import ormconfig from "./ormconfig.test.json";

export function testConn(drop: boolean = false) {
  return createConnection({
    ...ormconfig,
    synchronize: drop,
    dropSchema: drop,
    entities: [__dirname + "/../entity/*.ts"],
  } as ConnectionOptions);
}
