"use strict";

const fs = require("fs");
const path = require("path");
const comments = require("./src/comments")
const globby = require("globby");

function eachFilename(patterns, callback) {
  patterns = patterns.concat(["!**/node_modules/**", "!./node_modules/**"]);

  try {
    const filePaths = globby
      .sync(patterns, { dot: true, nodir: true })
      .map(filePath => path.relative(process.cwd(), filePath));

    if (filePaths.length === 0) {
      console.error(`No matching files. Tried: ${patterns.join(" ")}`)
      process.exitCode = 2;
      return;
    }

    filePaths.forEach((filePath) => {
      callback(filePath);
    })

  } catch (err) {
    console.error(`Unable to expand glob patterns: ${patterns.join(" ")}`);
    process.exitCode = 2;
  }
}

function parseOptions(opts) {
  if (opts["_"].length === 0) {
    const usage = [
      "Usage: commenterize [file/glob]",
      ""
    ];

    process.stdout.write(usage.join("\n"));
  }
  else {
    start(opts);
  }
}

function start(opts) {
  const filepatterns = opts["_"];
  
  eachFilename(filepatterns, filename => {
    process.stdout.write("Processing...." + filename + "\n");

    try {
      const input = fs.readFileSync(filename, "utf8");
      const output = comments.generate(input);

      fs.writeFileSync(filename, output, "utf8");
    } catch (err) {
      console.error("Unable to write file: " + filename + "\n");
      process.exitCode = 2;

      return;
    }
  });
}

module.exports = {
  parseOptions
};
