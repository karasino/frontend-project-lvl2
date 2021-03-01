import _ from 'lodash';

const genIndent = (depth) => ' '.repeat(depth);

const parseValue = (value, spacesAmount) => {
  if (_.isObject(value)) {
    const iter = (obj, spaces) => {
      const parsedValue = Object.keys(obj).map((elem) => {
        const indents = genIndent(spaces);
        if (_.isObject(obj[elem])) {
          return `${indents}  ${elem}: ${iter(obj[elem], spaces + 4)}`;
        }
        return `${indents}  ${elem}: ${obj[elem]}`;
      });
      return ['{', ...parsedValue, `${genIndent(spaces - 2)}}`].join('\n');
    };
    return iter(value, spacesAmount);
  }
  return value;
};

export default (ast) => {
  const iter = (tree, spacesAmount) => {
    const indent = genIndent(spacesAmount);
    const diff = tree.flatMap((node) => {
      const {
        key,
        type,
        value,
      } = node;
      switch (type) {
        case 'nested':
          return [`${indent}  ${key}: ${iter(value, spacesAmount + 4)}`];
        case 'unmodified':
          return [`${indent}  ${key}: ${parseValue(value, spacesAmount + 4)}`];
        case 'modified':
          return [
            `${indent}- ${key}: ${parseValue(value.old, spacesAmount + 4)}`,
            `${indent}+ ${key}: ${parseValue(value.new, spacesAmount + 4)}`,
          ];
        case 'deleted':
          return [`${indent}- ${key}: ${parseValue(value, spacesAmount + 4)}`];
        case 'added':
          return [`${indent}+ ${key}: ${parseValue(value, spacesAmount + 4)}`];
        default:
          break;
      }
      return false;
    });
    return ['{', ...diff, `${genIndent(spacesAmount - 2)}}`].join('\n');
  };
  return iter(ast, 2);
};
