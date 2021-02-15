import _ from 'lodash';

const parseValue = (value) => {
  if (_.isPlainObject(value)) return '[complex value]';
  return typeof value === 'string' ? `'${value}'` : value;
};

export default (data) => {
  const iter = (acc, path, diffArr) => {
    let newAcc = acc;
    diffArr.forEach((diff) => {
      const {
        key,
        type,
        value,
      } = diff;
      const newPath = [...path, key];
      if (type === 'nested') {
        newAcc = iter(acc, newPath, value);
      } else {
        const pathStr = newPath.join('.');
        switch (type) {
          case 'modified':
            newAcc.push(`Property '${pathStr}' was updated. From ${parseValue(value.old)} to ${parseValue(value.new)}`);
            break;
          case 'deleted':
            newAcc.push(`Property '${pathStr}' was removed`);
            break;
          case 'added':
            newAcc.push(`Property '${pathStr}' was added with value: ${parseValue(value)}`);
            break;
          default:
            break;
        }
      }
    });
    return newAcc;
  };
  return iter([], [], data).join('\n');
};
