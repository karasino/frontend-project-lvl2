import { extname } from 'path';
import _ from 'lodash';
import parser from './parsers';

export default (filepath1, filepath2) => {
  const data1 = parser[extname(filepath1)](filepath1);
  const data2 = parser[extname(filepath2)](filepath2);
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const uniqueKeys = _.uniq([...keys1, ...keys2]);
  const result = uniqueKeys.reduce((acc, key) => {
    if (keys1.includes(key) && keys2.includes(key)) {
      if (data1[key] === data2[key]) {
        acc.push(`${key}: ${data1[key]}`);
      } else {
        acc.push(`- ${key}: ${data1[key]}`);
        acc.push(`+ ${key}: ${data2[key]}`);
      }
    } else if (keys1.includes(key)) {
      acc.push(`- ${key}: ${data1[key]}`);
    } else if (keys2.includes(key)) {
      acc.push(`+ ${key}: ${data2[key]}`);
    }
    return acc;
  }, []);
  return result.join('\n');
};
