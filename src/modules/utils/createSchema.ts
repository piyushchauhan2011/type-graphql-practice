import { buildSchema } from "type-graphql";
import { ChangePasswordResolver } from "../user/ChangePassword";
import { ConfirmUserResolver } from "../user/ConfirmUser";
import { ForgotPasswordResolver } from "../user/ForgotPassword";
import { LoginResolver } from "../user/Login";
import { LogoutResolver } from "../user/Logout";
import { MeResolver } from "../user/Me";
import { RegisterResolver } from "../user/Register";

export function createSchema() {
  return buildSchema({
    resolvers: [
      ChangePasswordResolver,
      ConfirmUserResolver,
      ForgotPasswordResolver,
      LoginResolver,
      LogoutResolver,
      MeResolver,
      RegisterResolver,
    ],
  });
}
