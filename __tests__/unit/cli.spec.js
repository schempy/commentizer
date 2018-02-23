describe("cli", () => {
  let fs;
  let comments;
  let stdoutContents;

  beforeEach(() => {
    fs = require("fs");
    comments = require("../../src/comments");
    stdoutContents = "";

    jest
      .spyOn(process.stdout, "write")
      .mockImplementation(text => (stdoutContents = text));

    jest
      .spyOn(fs, "writeFileSync")
      .mockImplementation((filename, content) => {});
  });

  afterEach(() => {
    jest.resetModules();
    jest.restoreAllMocks();
  });

  test("should generate comments", () => {
    jest.spyOn(comments, "generate");

    process.argv = [
      "some-directory",
      "some-directory",
      "__tests__/fixtures/*.js"
    ];

    require("../../bin/commentizer");

    expect(comments.generate).toHaveBeenCalled();
    expect(fs.writeFileSync).toHaveBeenCalled();
  });

  test("should display command line options", () => {
    process.argv = [];

    require("../../bin/commentizer");

    const expected = `Usage: commenterize [file/glob]\n`;

    expect(process.stdout.write).toHaveBeenCalledTimes(1);
    expect(stdoutContents).toBe(expected);
  });

  test("should not find matching source files", () => {
    let errorMsg = "";

    jest.spyOn(console, "error").mockImplementation(err => (errorMsg = err));

    process.argv = [
      "some-directory",
      "some-directory",
      "__tests__/invalid_dir/file.js"
    ];

    require("../../bin/commentizer");

    const expected =
      "No matching files. Tried: __tests__/invalid_dir/file.js !**/node_modules/** !./node_modules/**";

    expect(errorMsg).toBe(expected);
  });

  test("should error expanding glob pattern", () => {
    let errorMsg = "";

    jest.spyOn(console, "error").mockImplementation(err => (errorMsg = err));

    process.argv = ["some-directory", "some-directory", 1234];

    require("../../bin/commentizer");

    const expected =
      "Unable to expand glob patterns: 1234 !**/node_modules/** !./node_modules/**";

    expect(errorMsg).toBe(expected);
  });

  test("should error when writing file after generating comments", () => {
    let errorMsg = "";

    jest.spyOn(fs, "writeFileSync").mockImplementation((filename, content) => {
      throw "error";
    });

    jest.spyOn(console, "error").mockImplementation(err => (errorMsg = err));

    process.argv = [
      "some-directory",
      "some-directory",
      "__tests__/fixtures/*.js"
    ];

    require("../../bin/commentizer");

    const expected = `Unable to write file: __tests__/fixtures/test.js\n`;

    expect(errorMsg).toBe(expected);
  });
});
