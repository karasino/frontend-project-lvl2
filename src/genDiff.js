import { extname } from 'path';
import _ from 'lodash';
import parser from './parsers.js';
import formatters from './formatters/index.js';

const isObject = (obj) => _.isObject(obj) && !_.isArray(obj);

const validExtensions = ['.json', '.yml'];
const validFormatters = ['stylish', 'plain', 'json'];

export default (filepath1, filepath2, formatterName = 'stylish') => {
  const file1Extension = extname(filepath1);
  const file2Extension = extname(filepath2);
  if (!validExtensions.includes(file1Extension) || !validExtensions.includes(file2Extension)) {
    throw new Error('Unsupported file extension!');
  }
  if (!validFormatters.includes(formatterName)) {
    throw new Error('Unsuppurted formatter!');
  }
  const data1 = parser[file1Extension](filepath1);
  const data2 = parser[file2Extension](filepath2);
  const iter = (depth, obj1, obj2) => {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    const uniqueKeys = _.uniq([...keys1, ...keys2]);
    const sortedKeys = uniqueKeys.sort();
    const diff = sortedKeys.map((key) => {
      const value1 = obj1[key];
      const value2 = obj2[key];
      const diffObj = {};
      diffObj.name = key;
      diffObj.children = null;
      diffObj.depth = depth;
      if (keys1.includes(key) && keys2.includes(key)) {
        if (isObject(value1) && isObject(value2)) {
          diffObj.children = iter(depth + 4, value1, value2);
        } else if (value1 === value2) {
          diffObj.status = 'untouched';
          diffObj.value = value1;
        } else {
          diffObj.status = 'modified';
          diffObj.value = value2;
          diffObj.oldValue = value1;
        }
      } else if (keys1.includes(key)) {
        diffObj.status = 'deleted';
        diffObj.value = value1;
      } else if (keys2.includes(key)) {
        diffObj.status = 'added';
        diffObj.value = value2;
      }
      return diffObj;
    });
    return diff;
  };
  const formatter = formatters[formatterName];
  return formatter(iter(2, data1, data2));
};
