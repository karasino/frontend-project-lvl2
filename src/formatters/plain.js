import _ from 'lodash';

const parseValue = (value) => {
  if (_.isPlainObject(value)) return '[complex value]';
  return typeof value === 'string' ? `'${value}'` : value;
};

export default (data) => {
  const iter = (path, tree) => {
    const diff = tree.map((node) => {
      const {
        key,
        type,
        value,
      } = node;
      const newPath = [...path, key];
      const pathStr = newPath.join('.');
      switch (type) {
        case 'nested':
          return iter(newPath, value);
        case 'modified':
          return `Property '${pathStr}' was updated. From ${parseValue(value.old)} to ${parseValue(value.new)}`;
        case 'deleted':
          return `Property '${pathStr}' was removed`;
        case 'added':
          return `Property '${pathStr}' was added with value: ${parseValue(value)}`;
        default:
          break;
      }
      return false;
    });
    return _.compact(diff).join('\n');
  };
  return iter([], data);
};
