import _ from 'lodash';

const genRootChildren = (obj1, obj2) => {
  const uniqueKeys = _.union(Object.keys(obj1), Object.keys(obj2));
  const sortedKeys = _.sortBy(uniqueKeys);
  return sortedKeys.map((key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];
    if (_.isEqual(value1, value2)) {
      if (!_.isPlainObject(value1) && !_.isPlainObject(value2)) {
        return {
          key,
          type: 'unmodified',
          value: value1,
        };
      }
      return {
        key,
        type: 'unmodified',
        children: genRootChildren(value1, value2),
      };
    }
    if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      return {
        key,
        type: 'nested',
        children: genRootChildren(value1, value2),
      };
    }
    if (_.has(obj1, key)) {
      if (_.has(obj2, key)) {
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

const genDiffNode = (obj1, obj2) => ({ type: 'root', children: genRootChildren(obj1, obj2) });

export default genDiffNode;
