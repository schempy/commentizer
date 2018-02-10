const comments = require("../../src/comments");

function generateCode(code) {
  const output = comments
    .generate(code)
    .replace(/ /g, "")
    .trim();

  return output;  
}

module.exports = generateCode;
