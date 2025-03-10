"use server";

import { api } from "~/trpc/server";

export async function createNewGrid(id: string) {
  const test = api.grids.create(id);
  return test;
}
