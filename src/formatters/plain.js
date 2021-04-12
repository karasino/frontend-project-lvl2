import _ from 'lodash';

const mergePropertyName = (names) => names.join('.');

const stringifyValue = (value) => {
  if (_.isObject(value)) return '[complex value]';
  return typeof value === 'string' ? `'${value}'` : `${value}`;
};

const processNode = (node, keys) => {
  switch (node.type) {
    case 'root':
      return _.compact(node.children.map((childNode) => processNode(childNode, keys))).join('\n');
    case 'nested':
      return _.compact(node.children.map((childNode) => processNode(childNode, [...keys, node.key]))).join('\n');
    case 'unmodified':
      return '';
    case 'modified':
      return `Property '${mergePropertyName([...keys, node.key])}' was updated. From ${stringifyValue(node.oldValue)} to ${stringifyValue(node.newValue)}`;
    case 'deleted':
      return `Property '${mergePropertyName([...keys, node.key])}' was removed`;
    case 'added':
      return `Property '${mergePropertyName([...keys, node.key])}' was added with value: ${stringifyValue(node.value)}`;
    default:
      throw new Error('Unsupported node type!');
  }
};

export default (tree) => processNode(tree, []);
