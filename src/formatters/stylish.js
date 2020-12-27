import _ from 'lodash';

const isObject = (obj) => _.isObject(obj) && !_.isArray(obj);

const genIndents = (depth) => ' '.repeat(depth);

const parseValue = (depth, value) => {
  if (isObject(value)) {
    const iter = (acc, obj, newDepth) => {
      Object.keys(obj).forEach((elem) => {
        const indents = genIndents(newDepth);
        if (isObject(obj[elem])) {
          acc.push(`${indents}  ${elem}: ${iter([], obj[elem], newDepth + 4)}`);
        } else {
          acc.push(`${indents}  ${elem}: ${obj[elem]}`);
        }
      });
      acc.unshift('{');
      acc.push(`${genIndents(newDepth - 2)}}`);
      return acc.join('\n');
    };
    return iter([], value, depth);
  }
  return value;
};

export default (data) => {
  const iter = (acc, diffArr, diffIndent = '') => {
    diffArr.forEach((diff) => {
      const {
        name,
        status,
        value,
        children,
        depth,
      } = diff;
      const indents = genIndents(depth);
      if (children) {
        acc.push(`${indents}  ${name}: ${iter([], children, genIndents(depth + 2))}`);
      }
      switch (status) {
        case 'untouched':
          acc.push(`${indents}  ${name}: ${parseValue(depth + 4, value)}`);
          break;
        case 'modified':
          acc.push(`${indents}- ${name}: ${parseValue(depth + 4, diff.oldValue)}`);
          acc.push(`${indents}+ ${name}: ${parseValue(depth + 4, value)}`);
          break;
        case 'deleted':
          acc.push(`${indents}- ${name}: ${parseValue(depth + 4, value)}`);
          break;
        case 'added':
          acc.push(`${indents}+ ${name}: ${parseValue(depth + 4, value)}`);
          break;
        default:
          break;
      }
    });
    acc.unshift('{');
    acc.push(`${diffIndent}}`);
    return acc.join('\n');
  };
  return iter([], data);
};
