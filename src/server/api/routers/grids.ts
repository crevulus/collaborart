import { z } from "zod";
import { pinSchema, usernameSchema } from "~/lib/validations";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const createGridInputSchema = z.object({
  device_id: z.string().uuid(),
  username: usernameSchema,
  pin: pinSchema,
});

export const gridsRouter = createTRPCRouter({
  create: publicProcedure
    .input(createGridInputSchema)
    .mutation(async ({ input, ctx }) => {
      const grid = await ctx.db.grids.create({
        data: {
          created_at: new Date(),
          device_id: input.device_id,
        },
      });

      const guest = await ctx.db.guests.create({
        data: {
          grid_id: grid.id,
          username: input.username,
          pin: parseInt(input.pin),
          device_id: input.device_id,
        },
      });

      await ctx.db.grids.update({
        where: { id: grid.id },
        data: { owner_id: guest.id },
      });

      return grid;
    }),
});
