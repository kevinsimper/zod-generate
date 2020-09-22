import { generate } from "./index";

test("generate", () => {
  const input = `const obj = {
  a: 1,
  b: "z",
  c: true,
};`;
  const output = `z.object({
  a: z.number(),
  b: z.string(),
  c: z.boolean(),
});
`;
  const result = generate(input);
  expect(result).toBe(output);
});
