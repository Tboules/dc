"use server";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function findDesertFigure(val: string) {
  await sleep(3000);
  return val;
}
