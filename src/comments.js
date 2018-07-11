const babylon = require("@babel/parser");
const t = require("@babel/types");
const babelGenerate = require("@babel/generator").default;
const traverse = require("@babel/traverse").default;

function getParams(nodes) {
  const params = nodes.reduce((acc, param) => {
    if (t.isIdentifier(param)) {
      acc.push(param.name);
    } else if (t.isAssignmentPattern(param)) {
      acc.push(param.left.name);
    }

    return acc;
  }, []);

  return params;
}

function doesReturn(node) {
  const returnFlg = node.body.body.some(element => {
    return t.isReturnStatement(element);
  });

  return returnFlg;
}

function addComments(path) {
  const params = getParams(path.node.params);
  const paramsComment =
    params.length > 0
      ? params.reduce((acc, param) => {
          acc.push(`* @param {} ${param}`);

          return acc;
        }, [])
      : ["*"];

  let node = null;
  let name = null;
  let commentStr = null;

  if (t.isFunctionDeclaration(path.node)) {
    if (t.isExportDefaultDeclaration(path.parent)) {
      node = path.parent;
    } else {
      node = path.node;
    }

    name = path.node.id ? path.node.id.name : "";
  } else if (t.isClassMethod(path.node)) {
    node = path.node;
    name = path.node.key.name;
  } else if (t.isVariableDeclarator(path.parentPath.node)) {
    name = path.parentPath.node.id.name;
    node = path.parentPath.parentPath.node;
  } else if (t.isProperty(path.parentPath.node)) {
    node = path.parentPath.node;
    name = path.parentPath.node.key.name;
  }

  if (!node) {
    return;
  }

  commentStr = `*\n * ${name}\n ${paramsComment.join("\n ")}\n `;

  if (doesReturn(path.node)) {
    commentStr = commentStr + `* @returns {}\n `;
  }

  if (!node.leadingComments) {
    const comments = {
      type: "CommentBlock",
      value: commentStr
    };

    node.leadingComments = [comments];
  }
}

function generate(code) {
  const opts = {
    sourceType: "module",
    allowImportExportEverywhere: false,
    plugins: [
      "jsx",
      "flow",
      "doExpressions",
      "decorators",
      "classProperties",
      "asyncGenerators"
    ]
  };

  try {
    const ast = babylon.parse(code, opts);

    traverse(ast, {
      ClassMethod(path) {
        addComments(path);
      },

      FunctionDeclaration(path) {
        addComments(path);
      },

      FunctionExpression(path) {
        addComments(path);
      },

      ArrowFunctionExpression(path) {
        addComments(path);
      }
    });

    const output = babelGenerate(ast, {});

    return output.code;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  generate
};
