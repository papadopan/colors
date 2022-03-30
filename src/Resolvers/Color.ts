import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { Context } from "src/types";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Color } from "../Entities/Color";

@Resolver()
export class ColorResolver {
  @Query(() => Color)
  async color(
    @Arg("name", { nullable: false }) name: string,
    @Ctx() { db }: Context
  ): Promise<Color> {
    try {
      const color = await db.colors.findUnique({ where: { name: name } });
      // in case the color is not saved in our db
      if (!color) {
        throw new Error("This color name is not found");
      }

      return color;
    } catch (e) {
      if (e instanceof Error) {
        throw new Error(e.message);
      } else {
        throw new Error("there was an issue with your request.");
      }
    }
  }
  @Query(() => [Color])
  async colors(@Ctx() { db }: Context): Promise<Color[]> {
    try {
      const colors = await db.colors.findMany();
      return colors;
    } catch (e) {
      if (e instanceof Error) {
        throw new Error(e.message);
      } else {
        throw new Error("there was an issue with fetching colors");
      }
    }
  }
  @Mutation(() => Color)
  async addNewColor(
    @Arg("name", { nullable: false }) name: string,
    @Arg("hex", { nullable: false }) hex: string,
    @Ctx() { db }: Context
  ): Promise<Color> {
    try {
      const newColor = await db.colors.create({
        data: {
          name,
          hex,
        },
      });

      return newColor;
    } catch (e) {
      if (e instanceof Error) {
        if (e instanceof PrismaClientKnownRequestError && e.code === "P2002") {
          throw new Error("This color name already exists in the db");
        }
        throw new Error(e.message);
      } else {
        throw new Error("there was an error while saving to db");
      }
    }
  }

  @Mutation(() => Color)
  async deleteColor(
    @Arg("name", { nullable: false }) name: string,
    @Ctx() { db }: Context
  ): Promise<Color> {
    try {
      const colorToDelete = await db.colors.delete({ where: { name: name } });
      return colorToDelete;
    } catch (e) {
      if (e instanceof Error) {
        if (e instanceof PrismaClientKnownRequestError && e.code === "P2025") {
          throw new Error("This color name does not exist");
        }
        throw new Error(e.message);
      } else {
        throw new Error("there was an error while deleting");
      }
    }
  }

  @Mutation(() => Color)
  async updateColor(
    @Arg("hex", { nullable: false }) hex: string,
    @Arg("name", { nullable: false }) name: string,
    @Ctx() { db }: Context
  ): Promise<Color> {
    try {
      const updatedColor = await db.colors.update({
        where: { name: name },
        data: { hex: hex },
      });

      return updatedColor;
    } catch (e) {
      if (e instanceof Error) {
        if (e instanceof PrismaClientKnownRequestError && e.code === "P2025") {
          throw new Error("This color name does not exist");
        }
        throw new Error(e.message);
      }
      throw new Error("there was an issue while updating, please try again");
    }
  }
}
