import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const devicesRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const devices = await ctx.db.devices.findMany();

    return devices;
  }),

  getOne: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const device = await ctx.db.devices.findUnique({
        where: { id: input.id },
      });

      return device;
    }),

  create: publicProcedure.mutation(async ({ ctx }) => {
    const device = await ctx.db.devices.create({
      data: {
        created_at: new Date(),
      },
    });

    return device;
  }),
});
