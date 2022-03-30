import { Request, Response } from "express";
import { Prisma, PrismaClient } from "@prisma/client";

export type Context = {
  req: Request;
  res: Response;
  db: PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  >;
};
