const list: string[] = [];

for (const entry of Deno.readDirSync("./docs/data")) {
  list.push(entry.name.replace(".json", ""));
}

Deno.writeTextFileSync("./docs/list.json", JSON.stringify(list, null, "\t"));

console.log("[SUCCESS]");
