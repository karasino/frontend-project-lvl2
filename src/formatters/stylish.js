import _ from 'lodash';

const genIndent = (depth) => ' '.repeat(depth);

const parseValue = (value, spacesAmount) => {
  if (_.isObject(value)) {
    const iter = (obj, spaces) => {
      const parsedValue = Object.keys(obj).reduce((acc, elem) => {
        const indents = genIndent(spaces);
        if (_.isObject(obj[elem])) {
          acc.push(`${indents}  ${elem}: ${iter(obj[elem], spaces + 4)}`);
        } else {
          acc.push(`${indents}  ${elem}: ${obj[elem]}`);
        }
        return acc;
      }, []);
      parsedValue.unshift('{');
      parsedValue.push(`${genIndent(spaces - 2)}}`);
      return parsedValue.join('\n');
    };
    return iter(value, spacesAmount);
  }
  return value;
};

export default (ast) => {
  const iter = (tree, spacesAmount) => {
    const indent = genIndent(spacesAmount);
    const diff = tree.reduce((acc, node) => {
      const {
        key,
        type,
        value,
      } = node;
      switch (type) {
        case 'nested':
          acc.push(`${indent}  ${key}: ${iter(value, spacesAmount + 4)}`);
          break;
        case 'unmodified':
          acc.push(`${indent}  ${key}: ${parseValue(value, spacesAmount + 4)}`);
          break;
        case 'modified':
          acc.push(`${indent}- ${key}: ${parseValue(value.old, spacesAmount + 4)}`);
          acc.push(`${indent}+ ${key}: ${parseValue(value.new, spacesAmount + 4)}`);
          break;
        case 'deleted':
          acc.push(`${indent}- ${key}: ${parseValue(value, spacesAmount + 4)}`);
          break;
        case 'added':
          acc.push(`${indent}+ ${key}: ${parseValue(value, spacesAmount + 4)}`);
          break;
        default:
          break;
      }
      return acc;
    }, []);
    diff.unshift('{');
    diff.push(`${genIndent(spacesAmount - 2)}}`);
    return diff.join('\n');
  };
  return iter(ast, 2);
};
