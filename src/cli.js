const minimist = require("minimist");
const commenterize = require("../index");

function run(args) {
  const opts = minimist(args);

  commenterize.parseOptions(opts);
}

module.exports = {
  run
};
