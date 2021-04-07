import _ from 'lodash';

const stringifyValue = (value) => {
  if (_.isObject(value)) return '[complex value]';
  return typeof value === 'string' ? `'${value}'` : value;
};

const processNode = (node, path) => {
  const newPath = [...path, node.key];
  const pathString = newPath.join('.');
  switch (node.type) {
    case 'root':
      return _.compact(node.children.map((childNode) => processNode(childNode, path))).join('\n');
    case 'nested':
      return _.compact(node.children.map((childNode) => processNode(childNode, newPath))).join('\n');
    case 'unmodified':
      return '';
    case 'modified':
      return `Property '${pathString}' was updated. From ${stringifyValue(node.oldValue)} to ${stringifyValue(node.newValue)}`;
    case 'deleted':
      return `Property '${pathString}' was removed`;
    case 'added':
      return `Property '${pathString}' was added with value: ${stringifyValue(node.value)}`;
    default:
      throw new Error('Unsupported node type!');
  }
};

export default (tree) => processNode(tree, []);
