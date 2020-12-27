import _ from 'lodash';

const isObject = (obj) => _.isObject(obj) && !_.isArray(obj);

const parseValue = (value) => {
  if (isObject(value)) return '[complex value]';
  return typeof value === 'string' ? `'${value}'` : value;
};

export default (data) => {
  const iter = (acc, path, diffArr) => {
    let newAcc = acc;
    diffArr.forEach((diff) => {
      const { name, children } = diff;
      const newPath = [...path, name];
      if (children) {
        newAcc = iter(acc, newPath, children);
      } else {
        const { status, value } = diff;
        const pathStr = newPath.join('.');
        const parsedValue = parseValue(value);
        switch (status) {
          case 'modified':
            newAcc.push(`Property '${pathStr}' was updated. From ${parseValue(diff.oldValue)} to ${parsedValue}`);
            break;
          case 'deleted':
            newAcc.push(`Property '${pathStr}' was removed`);
            break;
          case 'added':
            newAcc.push(`Property '${pathStr}' was added with value: ${parsedValue}`);
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
