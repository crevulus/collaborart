import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const artistsRouter = createTRPCRouter({
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
});
