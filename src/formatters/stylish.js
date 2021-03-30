import _ from 'lodash';

const stringifyValue = (value, depth) => {
  if (_.isPlainObject(value)) {
    const indent = ' '.repeat(depth * 4);
    const stringifiedValue = Object.keys(value).map((elem) => (
      `${indent}  ${elem}: ${stringifyValue(value[elem], depth + 1)}`));
    return ['{', ...stringifiedValue, `${indent.slice(0, -2)}}`].join('\n');
  }
  return value;
};

const processNode = (node, depth) => {
  const indent = ' '.repeat(depth * 4);
  switch (node.type) {
    case 'root':
      return `{\n${node.children.map((childNode) => processNode(childNode, 0.5)).join('\n')}\n}`;
    case 'nested':
      return `${indent}  ${node.key}: {\n${node.children.map((childNode) => (
        processNode(childNode, depth + 1))).join('\n')}\n${indent.concat('  ')}}`;
    case 'unmodified':
      return `${indent}  ${node.key}: ${stringifyValue(node.value, depth + 1)}`;
    case 'modified':
      return [
        `${indent}- ${node.key}: ${stringifyValue(node.oldValue, depth + 1)}`,
        `${indent}+ ${node.key}: ${stringifyValue(node.newValue, depth + 1)}`,
      ].join('\n');
    case 'deleted':
      return `${indent}- ${node.key}: ${stringifyValue(node.value, depth + 1)}`;
    case 'added':
      return `${indent}+ ${node.key}: ${stringifyValue(node.value, depth + 1)}`;
    default:
      throw new Error('Unsupported node type!');
  }
};

export default (tree) => processNode(tree, 0);
