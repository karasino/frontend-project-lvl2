import _ from 'lodash';

const genChildren = (obj1, obj2) => {
  const uniqueKeys = _.union(Object.keys(obj1), Object.keys(obj2));
  const sortedKeys = _.sortBy(uniqueKeys);
  return sortedKeys.map((key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];
    if (_.has(obj1, key)) {
      if (_.has(obj2, key)) {
        if (_.isEqual(value1, value2)) {
          return {
            key,
            type: 'unmodified',
            value: value1,
          };
        }
        if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
          return {
            key,
            type: 'nested',
            children: genChildren(value1, value2),
          };
        }
        return {
          key,
          type: 'modified',
          oldValue: value1,
          newValue: value2,
        };
      }
      return {
        key,
        type: 'deleted',
        value: value1,
      };
    }
    return {
      key,
      type: 'added',
      value: value2,
    };
  });
};

const genDiffTree = (obj1, obj2) => ({ type: 'root', children: genChildren(obj1, obj2) });

export default genDiffTree;
