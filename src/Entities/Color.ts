import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class Color {
  @Field(() => ID, { nullable: false })
  id: number;

  @Field(() => String, { nullable: false })
  name: string;

  @Field(() => String, { nullable: false })
  hex: string;
}
