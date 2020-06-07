import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { RegisterResolver } from "./modules/user/Register";
import session from "express-session";
import connectRedis from "connect-redis";
import { redis } from "./redis";
import cors from "cors";
import { LoginResolver } from "./modules/user/Login";
import { MeResolver } from "./modules/user/Me";

const main = async () => {
  await createConnection();

  const schema = await buildSchema({
    resolvers: [MeResolver, RegisterResolver, LoginResolver],
    // authChecker: ({ context: { req } }) => {
    //   return !!req.session.userId;
    // },
  });

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req }) => ({ req }),
  });

  const app = express();

  const RedisStore = connectRedis(session);

  app.use(
    cors({
      credentials: true,
      origin: "http://localhost:4000",
    })
  );

  app.use(
    session({
      store: new RedisStore({
        client: redis,
      }),
      name: "qid",
      secret: "keyboard cat",
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24 * 7 * 365, // 7 years
      },
    })
  );

  // app.use(
  //   session({
  //     secret: "keyboard cat",
  //     resave: false,
  //     saveUninitialized: true,
  //     cookie: { secure: false },
  //   })
  // );

  apolloServer.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log("server started on http://localhost:4000/graphql");
  });
};

main();
