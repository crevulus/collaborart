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
      return await ctx.db.$transaction(async (tx) => {
        const grid = await tx.grids.create({
          data: {
            created_at: new Date(),
            device_id: input.device_id,
          },
        });

        const artist = await tx.artists.create({
          data: {
            username: input.username,
            pin: parseInt(input.pin),
            device_id: input.device_id,
            grid_id: grid.id,
          },
        });

        await tx.grids.update({
          where: { id: grid.id },
          data: { owner_id: artist.id },
        });

        return grid;
      });
    }),

  getActiveGrid: publicProcedure
    .input(z.object({ device_id: z.string().uuid() }))
    .query(async ({ input, ctx }) => {
      return await ctx.db.grids.findFirst({
        where: { device_id: input.device_id },
        orderBy: { created_at: "desc" },
      });
    }),

  getArtists: publicProcedure
    .input(z.object({ grid_id: z.number() }))
    .query(async ({ input, ctx }) => {
      return await ctx.db.artists.findMany({
        where: { grid_id: input.grid_id },
        select: {
          id: true,
          username: true,
          pin: true,
        },
      });
    }),

  getGridByArtist: publicProcedure
    .input(z.object({ artist_id: z.number() }))
    .query(async ({ input, ctx }) => {
      const artist = await ctx.db.artists.findUnique({
        where: { id: input.artist_id },
        select: { grid_id: true },
      });

      if (!artist) {
        return null;
      }

      return await ctx.db.grids.findUnique({
        where: { id: artist.grid_id },
      });
    }),
});
