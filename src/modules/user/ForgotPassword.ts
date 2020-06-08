import { Resolver, Mutation, Arg } from "type-graphql";
import { User } from "../../entity/User";
import { v4 } from "uuid";
import { redis } from "../../redis";
import { sendEmail } from "../utils/sendEmail";
import { forgotPasswordPrefix } from "../constants/redisPrefixes";

@Resolver()
export class ForgotPasswordResolver {
  @Mutation(() => Boolean)
  async forgotPassword(@Arg("email") email: string): Promise<boolean> {
    const user = await User.findOne({ where: { email } });
    console.log(user);

    if (!user) return true; // can throw Error depending on use-case

    const token = v4();
    await redis.set(forgotPasswordPrefix + token, user.id, "ex", 60 * 60 * 24); // 1 day expiration

    await sendEmail(
      user.email,
      `http://localhost:3000/user/change-password/${token}`
    );

    return true;
  }
}
