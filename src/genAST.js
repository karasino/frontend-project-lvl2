import _ from 'lodash';

const diffTypes = [
  {
    type: 'nested',
    check: (obj1, obj2, key) => (_.isPlainObject(obj1[key]) && _.isPlainObject(obj2[key])),
    process: (value1, value2, func) => func(value1, value2),
  },
  {
    type: 'unmodified',
    check: (obj1, obj2, key) => (_.has(obj1, key) && _.has(obj2, key))
      && (obj1[key] === obj2[key]),
    process: (value1) => _.identity(value1),
  },
  {
    type: 'modified',
    check: (obj1, obj2, key) => (_.has(obj1, key) && _.has(obj2, key))
      && (obj1[key] !== obj2[key]),
    process: (value1, value2) => ({ old: value1, new: value2 }),
  },
  {
    type: 'deleted',
    check: (obj1, obj2, key) => _.has(obj1, key) && !_.has(obj2, key),
    process: (value1) => _.identity(value1),
  },
  {
    type: 'added',
    check: (obj1, obj2, key) => !_.has(obj1, key) && _.has(obj2, key),
    process: (value1, value2) => _.identity(value2),
  },
];

const genAST = (obj1, obj2) => {
  const uniqueKeys = _.union(Object.keys(obj1), Object.keys(obj2));
  const sortedKeys = [...uniqueKeys].sort();
  return sortedKeys.map((key) => {
    const { type, process } = _.find(diffTypes, (item) => item.check(obj1, obj2, key));
    const value = process(obj1[key], obj2[key], genAST);
    return { key, type, value };
  });
};

export default genAST;
