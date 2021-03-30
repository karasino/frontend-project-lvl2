import _ from 'lodash';

const genChildren = (obj1, obj2) => {
  const uniqueKeys = _.union(Object.keys(obj1), Object.keys(obj2));
  const sortedKeys = _.sortBy(uniqueKeys);
  return sortedKeys.map((key) => {
    if (!_.has(obj1, key)) {
      return {
        key,
        type: 'added',
        value: obj2[key],
      };
    }
    if (!_.has(obj2, key)) {
      return {
        key,
        type: 'deleted',
        value: obj1[key],
      };
    }
    if (_.isEqual(obj1[key], obj2[key])) {
      return {
        key,
        type: 'unmodified',
        value: obj1[key],
      };
    }
    if (_.isPlainObject(obj1[key]) && _.isPlainObject(obj2[key])) {
      return {
        key,
        type: 'nested',
        children: genChildren(obj1[key], obj2[key]),
      };
    }
    return {
      key,
      type: 'modified',
      oldValue: obj1[key],
      newValue: obj2[key],
    };
  });
};

const genDiffTree = (obj1, obj2) => ({ type: 'root', children: genChildren(obj1, obj2) });

export default genDiffTree;
