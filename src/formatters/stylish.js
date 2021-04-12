import _ from 'lodash';

const indent = (depth) => ' '.repeat(depth * 4 - 2);

const stringifyValue = (value, depth, handleNode) => {
  if (!_.isPlainObject(value)) return value;
  const stringifiedValue = Object.keys(value).map((key) => {
    const node = {
      type: 'unmodified',
      key,
      value: value[key],
    };
    return handleNode(node, depth + 1);
  });
  return `{\n${stringifiedValue.join('\n')}\n  ${indent(depth)}}`;
};

const processNode = (node, depth) => {
  switch (node.type) {
    case 'root':
      return `{\n${node.children.map((childNode) => processNode(childNode, depth + 1)).join('\n')}\n}`;
    case 'nested':
      return `${indent(depth)}  ${node.key}: {\n${node.children.map((childNode) => (
        processNode(childNode, depth + 1))).join('\n')}\n${indent(depth)}  }`;
    case 'unmodified':
      return `${indent(depth)}  ${node.key}: ${stringifyValue(node.value, depth, processNode)}`;
    case 'modified':
      return [
        `${indent(depth)}- ${node.key}: ${stringifyValue(node.oldValue, depth, processNode)}`,
        `${indent(depth)}+ ${node.key}: ${stringifyValue(node.newValue, depth, processNode)}`,
      ].join('\n');
    case 'deleted':
      return `${indent(depth)}- ${node.key}: ${stringifyValue(node.value, depth, processNode)}`;
    case 'added':
      return `${indent(depth)}+ ${node.key}: ${stringifyValue(node.value, depth, processNode)}`;
    default:
      throw new Error('Unsupported node type!');
  }
};

export default (tree) => processNode(tree, 0);
