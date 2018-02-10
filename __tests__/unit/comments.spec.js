const generateCode = require("../util/generate-code");

describe("Comments", () => {
  test("should generate comments and keep code that is not a function", () => {
    const code = `
      const foo = true;

      function bar() {
        return true;
      }
    `;

    const expected = `
      const foo = true;

      /**
       * bar
       *
       * @returns {}
       */
      function bar() {
        return true;
     }`
      .replace(/ /g, "")
      .trim();

    const output = generateCode(code);

    expect(output).toBe(expected);
  });

  test("should generate comments for a function declaration with no paramters", () => {
    const code = `
      function foo() {}
    `;

    const expected = `
      /**
       * foo
       *
       */
      function foo() {}
    `
      .replace(/ /g, "")
      .trim();

    const output = generateCode(code);

    expect(output).toBe(expected);
  });

  test("should generate comments for a function declaration with parameters", () => {
    const code = `
      function add(num1, num2) {
        return num1 + num2;
      }
    `;

    const expected = `
      /**
       * add
       * @param {} num1
       * @param {} num2
       * @returns {}
       */
      function add(num1, num2) {
        return num1 + num2;
      }`
      .replace(/ /g, "")
      .trim();

    const output = generateCode(code);

    expect(output).toBe(expected);
  });

  test("should generate comments for a function declaration with default parameters", () => {
    const code = `
      function add(num1 = 0, num2 = 0) {
        return num1 - num2;
      }
    `;

    const expected = `
      /**
       * add
       * @param {} num1
       * @param {} num2
       * @returns {}
       */
      function add(num1 = 0, num2 = 0) {
        return num1 - num2;
      }`
      .replace(/ /g, "")
      .trim();

    const output = generateCode(code);

    expect(output).toBe(expected);
  });

  test("should generate comments for a function expression with no parameters", () => {
    const code = `
      const foo = function() {};
    `;

    const expected = `
      /**
       * foo
       *
       */
      const foo = function() {};
    `
      .replace(/ /g, "")
      .trim();

    const output = generateCode(code);

    expect(output).toBe(expected);
  });

  test("should generate comments for a function expression with parameters", () => {
    const code = `
      var add = function (num1, num2) {
        return num1 + num2;
      };
    `;

    const expected = `
      /**
      * add
      * @param {} num1
      * @param {} num2
      * @returns {}
      */
      var add = function (num1, num2) {
        return num1 + num2;
      };`
      .replace(/ /g, "")
      .trim();

    const output = generateCode(code);

    expect(output).toBe(expected);
  });

  test("should generate comments for a function expression with default parameters", () => {
    const code = `
      const add = function(num1 = 0, num2 = 0) {
        return num1 + num2;
      };
    `;

    const expected = `
      /**
       * add
       * @param {} num1
       * @param {} num2
       * @returns {}
       */
      const add = function(num1 = 0, num2 = 0) {
        return num1 + num2;
      };`
      .replace(/ /g, "")
      .trim();

    const output = generateCode(code);

    expect(output).toBe(expected);
  });

  test("should generate comments for a class method with parameters", () => {
    const code = `
      class TestClass {
        add(num1, num2) {
          return num1 + num2;
        }
      }
    `;

    const expected = `
      class TestClass {
        /**
         * add
         * @param {} num1
         * @param {} num2
         * @returns {}
         */
        add(num1, num2) {
          return num1 + num2;
        }

      }`
      .replace(/ /g, "")
      .trim();

    const output = generateCode(code);

    expect(output).toBe(expected);
  });

  test("should generate comments for a class constructor", () => {
    const code = `
      class TestClass {
        constructor() {}
      }
    `;

    const expected = `
      class TestClass {
        /**
         * constructor
         *
         */
        constructor() {}

      }`
      .replace(/ /g, "")
      .trim();

    const output = generateCode(code);

    expect(output).toBe(expected);
  });

  test("should generate comments for a export default function with a name", () => {
    const code = `
      export default function add(num1, num2) {
        return num1 + num2;
      }
    `;

    const expected = `
      /**
       * add
       * @param {} num1
       * @param {} num2
       * @returns {}
       */
      export default function add(num1, num2) {
        return num1 + num2;
      }`
      .replace(/ /g, "")
      .trim();

    const output = generateCode(code);

    expect(output).toBe(expected);
  });

  test("should generate comments for a function expression defined within module.exports", () => {
    const code = `
      module.exports = {
        add: function(num1, num2) {
          return num1 + num2;
        }
      };
    `;

    const expected = `
      module.exports = {
        /**
         * add
         * @param {} num1
         * @param {} num2
         * @returns {}
         */
        add: function(num1, num2) {
          return num1 + num2;
        }
      };`
      .replace(/ /g, "")
      .trim();

    const output = generateCode(code);

    expect(output).toBe(expected);
  });

  test("should generate comments for when exporting default function with no name", () => {
    const code = `
      export default function(num1, num2) {
        return num1 + num2;
      }
    `;

    const expected = `
      /**
       * 
       * @param {} num1
       * @param {} num2
       * @returns {}
       */
      export default function(num1, num2) {
        return num1 + num2;
      }`
      .replace(/ /g, "")
      .trim();

    const output = generateCode(code);

    expect(output).toBe(expected);
  });

  test("should not generate comments if they already exist", () => {
    const code = `
      /**
       * add
       * @param {} num1 The first number
       * @param {} num2 The second number
       * @returns {} The sum of the parameters
       */
      function add(num1, num2) {
        return num1 + num2;
      }
      function foo() {
        return true;
      }
    `;

    const expected = `
      /**
       * add
       * @param {} num1 The first number
       * @param {} num2 The second number
       * @returns {} The sum of the parameters
       */
      function add(num1, num2) {
        return num1 + num2;
      }

      /**
       * foo
       *
       * @returns {}
       */
      function foo() {
        return true;
      }`
      .replace(/ /g, "")
      .trim();

    const output = generateCode(code);

    expect(output).toBe(expected);
  });

  test("should generate comments for a arrow function expression", () => {
    const code = `
      const add = (num1, num2) => {
        return num1 + num2;
      };
    `;

    const expected = `
      /**
       * add
       * @param {} num1
       * @param {} num2
       * @returns {}
       */
      const add = (num1, num2) => {
        return num1 + num2;
      };`
      .replace(/ /g, "")
      .trim();

    const output = generateCode(code);

    expect(output).toBe(expected);
  });

  test("should not generate comments for a function expression", () => {
    const code = `
      callback(function () {
        return true;
      });
    `;

    const expected = `
      callback(function () {
        return true;
      });`
      .replace(/ /g, "")
      .trim();

    const output = generateCode(code);

    expect(output).toBe(expected);
  });

  test("should not generate comments for a arrow function expression", () => {
    const code = `
      callback(() => {
        return true;
      });
    `;

    const expected = `
      callback(() => {
        return true;
      });`
      .replace(/ /g, "")
      .trim();

    const output = generateCode(code);

    expect(output).toBe(expected);
  });

  test("should generate commetns for ES6 class using decorators", () => {
    const code = `
      @inject(EventAggregator)

      export class TestClass {
        add(num1, num2) {
          return num1 + num2;
        }
      };
    `;

    const expected = `
      @inject(EventAggregator)
      export class TestClass {
        /**
         * add
         * @param {} num1
         * @param {} num2
         * @returns {}
         */
        add(num1, num2) {
          return num1 + num2;
        }

      }
      ;`
      .replace(/ /g, "")
      .trim();

    const output = generateCode(code);

    expect(output).toBe(expected);
  });

  test("should throw a parse error", () => {
    const code = `
      fun() {}
    `;

    expect(() => {
      generateCode(code);
    }).toThrow();
  });
});
