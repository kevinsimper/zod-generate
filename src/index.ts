import * as z from "zod";
import { parse } from "acorn";
import { simple } from "acorn-walk";
import { format } from "prettier";

export function generate(input: string): string {
  const tree = parse(input, { ecmaVersion: 2020 });
  // console.log(JSON.stringify(tree, null, 2));
  let output = "z.object({\n";
  simple(tree, {
    Property(node) {
      //@ts-ignore
      const key = node.key.name;
      //@ts-ignore
      const value = node.value.value;
      try {
        z.string().parse(value);
        return (output += key + ": z.string(),\n");
      } catch (e) {
        // console.log({ e });
      }
      try {
        z.number().parse(value);
        return (output += key + ": z.number(),\n");
      } catch (e) {
        // console.log({ e });
      }
      try {
        z.boolean().parse(value);
        return (output += key + ": z.boolean(),\n");
      } catch (e) {
        // console.log({ e });
      }
      throw new Error("unknown type");
    },
  });
  output += "})";
  return format(output, { parser: "babel" });
}
