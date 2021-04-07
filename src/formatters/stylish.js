import _ from 'lodash';

const indent = (depth) => `  ${' '.repeat(depth * 4)}`;

const processNode = (node, depth, handleValue) => {
  switch (node.type) {
    case 'root':
      return `{\n${node.children.map((childNode) => processNode(childNode, depth, handleValue)).join('\n')}\n}`;
    case 'nested':
      return `${indent(depth)}  ${node.key}: {\n${node.children.map((childNode) => (
        processNode(childNode, depth + 1, handleValue))).join('\n')}\n${indent(depth)}  }`;
    case 'unmodified':
      return `${indent(depth)}  ${node.key}: ${handleValue(node.value, depth)}`;
    case 'modified':
      return [
        `${indent(depth)}- ${node.key}: ${handleValue(node.oldValue, depth)}`,
        `${indent(depth)}+ ${node.key}: ${handleValue(node.newValue, depth)}`,
      ].join('\n');
    case 'deleted':
      return `${indent(depth)}- ${node.key}: ${handleValue(node.value, depth)}`;
    case 'added':
      return `${indent(depth)}+ ${node.key}: ${handleValue(node.value, depth)}`;
    default:
      throw new Error('Unsupported node type!');
  }
};

const stringifyValue = (value, depth) => {
  if (!_.isPlainObject(value)) return value;
  const stringifiedValue = Object.keys(value).map((key) => {
    const node = {
      type: 'unmodified',
      key,
      value: value[key],
    };
    return processNode(node, depth + 1, stringifyValue);
  });
  return ['{', ...stringifiedValue, `  ${indent(depth)}}`].join('\n');
};

export default (tree) => processNode(tree, 0, stringifyValue);
