import { ListItem } from "../src/type.ts";

const assets: ListItem[] = JSON.parse(
  await Deno.readTextFile("./assets/list.json")
);

export function hasAsset(passname: string): boolean {
  const name = decodeURIComponent(passname.replace(/\/|data/g, ""));

  return name === "list" || assets.find((e) => name === e.name) !== undefined;
}

export async function getAsset(passname: string): Promise<Response> {
  const file = await Deno.readTextFile(`./assets${decodeURI(passname)}.json`);

  return new Response(file, {
    headers: { "content-type": "application/json" },
  });
}
