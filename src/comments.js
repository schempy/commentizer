const recast = require("recast");
const types = recast.types;
const n = recast.types.namedTypes;

function getParams(nodes) {
  const params = nodes.reduce((acc, param) => {
    if (n.Identifier.check(param)) {
      acc.push(param.name);
    } else if (n.AssignmentPattern.check(param)) {
      acc.push(param.left.name);
    }

    return acc;
  }, []);

  return params;
}

function doesReturn(node) {
  const returnFlg = node.body.body.some(element => {
    return n.ReturnStatement.check(element);
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

  if (n.FunctionDeclaration.check(path.node)) {
    if (n.ExportDefaultDeclaration.check(path.parentPath.node)) {
      node = path.parentPath.node;
    } else {
      node = path.node;
    }

    name = path.node.id ? path.node.id.name : "";
  }

  if (n.VariableDeclarator.check(path.parentPath.node)) {
    name = path.parentPath.node.id.name;
    node = path.parentPath.parentPath.node;
  } else if (n.MethodDefinition.check(path.parentPath.node)) {
    node = path.parentPath.node;
    name = path.parentPath.node.key.name;
  } else if (n.Property.check(path.parentPath.node)) {
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

  if (!node.comments) {
    node.comments = [
      {
        leading: true,
        trailing: false,
        type: "Block",
        value: commentStr
      }
    ];
  }
}

function generate(code) {
  const ast = recast.parse(code);

  types.visit(ast, {
    visitFunction: function(path) {
      addComments(path);

      return false;
    }
  });

  const output = recast.print(ast).code;

  return output;
}

module.exports = {
  generate
};
