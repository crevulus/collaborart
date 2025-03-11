"use server";

import { api } from "~/trpc/server";

export async function createNewGrid(id: string) {
  return api.grids.create(id);
}
