import _ from 'lodash';

const genIndent = (spaces) => ' '.repeat(spaces);

const spaceIndent = 2;
const tabIndent = 4;

const parseValue = (value, spacesAmount) => {
  if (_.isPlainObject(value)) {
    const iter = (obj, spaces) => {
      const parsedValue = Object.keys(obj).map((elem) => {
        const indent = genIndent(spaces);
        if (_.isPlainObject(obj[elem])) {
          return `${indent}  ${elem}: ${iter(obj[elem], spaces + tabIndent)}`;
        }
        return `${indent}  ${elem}: ${obj[elem]}`;
      });
      return ['{', ...parsedValue, `${genIndent(spaces - spaceIndent)}}`].join('\n');
    };
    return iter(value, spacesAmount);
  }
  return value;
};

export default (rootNode) => {
  const iter = (tree, spacesAmount) => {
    const indent = genIndent(spacesAmount);
    const diff = tree.flatMap((node) => {
      const {
        key,
        type,
      } = node;
      switch (type) {
        case 'nested':
          return [`${indent}  ${key}: ${iter(node.children, spacesAmount + tabIndent)}`];
        case 'unmodified':
          if (node.children) {
            return [`${indent}  ${key}: ${iter(node.children, spacesAmount + tabIndent)}`];
          }
          return [`${indent}  ${key}: ${parseValue(node.value, spacesAmount + tabIndent)}`];
        case 'modified':
          return [
            `${indent}- ${key}: ${parseValue(node.oldValue, spacesAmount + tabIndent)}`,
            `${indent}+ ${key}: ${parseValue(node.newValue, spacesAmount + tabIndent)}`,
          ];
        case 'deleted':
          return [`${indent}- ${key}: ${parseValue(node.value, spacesAmount + tabIndent)}`];
        case 'added':
          return [`${indent}+ ${key}: ${parseValue(node.value, spacesAmount + tabIndent)}`];
        default:
          break;
      }
      return false;
    });
    return ['{', ...diff, `${genIndent(spacesAmount - spaceIndent)}}`].join('\n');
  };
  return iter(rootNode.children, spaceIndent);
};
