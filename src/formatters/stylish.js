import _ from 'lodash';

const genIndent = (spaces) => ' '.repeat(spaces);

const twoSpacesIndent = 2;
const fourSpacesIndent = 4;

const stringifyValue = (value, spacesAmount) => {
  if (_.isPlainObject(value)) {
    const iter = (obj, spaces) => {
      const indent = genIndent(spaces);
      const parsedValue = Object.keys(obj).map((elem) => {
        if (_.isPlainObject(obj[elem])) {
          return `${indent}  ${elem}: ${iter(obj[elem], spaces + fourSpacesIndent)}`;
        }
        return `${indent}  ${elem}: ${obj[elem]}`;
      });
      return ['{', ...parsedValue, `${genIndent(spaces - twoSpacesIndent)}}`].join('\n');
    };
    return iter(value, spacesAmount);
  }
  return value;
};

const processNode = (depth, spacesAmount, indent, iter) => (node) => {
  const {
    key,
    type,
  } = node;
  switch (type) {
    case 'nested':
      return [`${indent}  ${key}: ${iter(node.children, depth + 1)}`];
    case 'unmodified':
      return [`${indent}  ${key}: ${stringifyValue(node.value, spacesAmount)}`];
    case 'modified':
      return [
        `${indent}- ${key}: ${stringifyValue(node.oldValue, spacesAmount)}`,
        `${indent}+ ${key}: ${stringifyValue(node.newValue, spacesAmount)}`,
      ];
    case 'deleted':
      return [`${indent}- ${key}: ${stringifyValue(node.value, spacesAmount)}`];
    case 'added':
      return [`${indent}+ ${key}: ${stringifyValue(node.value, spacesAmount)}`];
    default:
      break;
  }
  return false;
};

export default (rootNode) => {
  const iter = (nodes, depth) => {
    const spacesAmount = twoSpacesIndent + (depth * fourSpacesIndent);
    const indent = genIndent(spacesAmount);
    const diff = nodes.flatMap(processNode(depth, spacesAmount + fourSpacesIndent, indent, iter));
    return ['{', ...diff, `${genIndent(spacesAmount - twoSpacesIndent)}}`].join('\n');
  };
  return iter(rootNode.children, 0);
};

/* const genIndent = (spaces) => ' '.repeat(spaces);

const spaceIndent = 2;
const tabIndent = 4;

const stringifyValue = (value, spacesAmount) => {
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
  const iter = (nodes, depth) => {
    const indent = genIndent(depth);
    const diff = nodes.flatMap((node) => {
      const {
        key,
        type,
      } = node;
      switch (type) {
        case 'nested':
          return [`${indent}  ${key}: ${iter(node.children, depth + tabIndent)}`];
        case 'unmodified':
          return [`${indent}  ${key}: ${stringifyValue(node.value, depth + tabIndent)}`];
        case 'modified':
          return [
            `${indent}- ${key}: ${stringifyValue(node.oldValue, depth + tabIndent)}`,
            `${indent}+ ${key}: ${stringifyValue(node.newValue, depth + tabIndent)}`,
          ];
        case 'deleted':
          return [`${indent}- ${key}: ${stringifyValue(node.value, depth + tabIndent)}`];
        case 'added':
          return [`${indent}+ ${key}: ${stringifyValue(node.value, depth + tabIndent)}`];
        default:
          break;
      }
      return false;
    });
    return ['{', ...diff, `${genIndent(depth - spaceIndent)}}`].join('\n');
  };
  return iter(rootNode.children, spaceIndent);
}; */
