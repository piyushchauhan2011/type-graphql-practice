import { InputType, Field } from "type-graphql";
// import { Min } from "class-validator";

@InputType()
export class PasswordInput {
  @Field()
  // @Min(5) // min validation is not working!
  password: string;
}
