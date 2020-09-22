#!/usr/bin/env node
import { generate } from "./";

process.stdin.resume();
process.stdin.setEncoding("utf8");

let buffer = "";
process.stdin.on("data", function (chunk) {
  buffer += chunk;
});
process.stdin.on("end", function () {
  const result = generate(buffer);
  console.log(result);
});
