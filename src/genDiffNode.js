import _ from 'lodash';

const genRootChildren = (obj1, obj2) => {
  const uniqueKeys = _.union(Object.keys(obj1), Object.keys(obj2));
  const sortedKeys = _.sortBy(uniqueKeys);
  return sortedKeys.map((key) => {
    const node = { key };
    const value1 = obj1[key];
    const value2 = obj2[key];
    if (_.isEqual(value1, value2)) {
      node.type = 'unmodified';
      if (!_.isPlainObject(value1) && !_.isPlainObject(value2)) {
        node.value = value1;
        return node;
      }
      node.children = genRootChildren(value1, value2);
      return node;
    }
    if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      node.type = 'nested';
      node.children = genRootChildren(value1, value2);
      return node;
    }
    if (_.has(obj1, key)) {
      if (_.has(obj2, key)) {
        node.type = 'modified';
        node.oldValue = value1;
        node.newValue = value2;
      } else {
        node.type = 'deleted';
        node.value = value1;
      }
    } else {
      node.type = 'added';
      node.value = value2;
    }
    return node;
  });
};

const genDiffNode = (obj1, obj2) => ({ type: 'root', children: genRootChildren(obj1, obj2) });

export default genDiffNode;

/* const diffTypes = [
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
  const sortedKeys = _.sortBy(uniqueKeys);
  return sortedKeys.map((key) => {
    const { type, process } = _.find(diffTypes, (item) => item.check(obj1, obj2, key));
    const value = process(obj1[key], obj2[key], genAST);
    return { key, type, value };
  });
};

export default genAST; */
