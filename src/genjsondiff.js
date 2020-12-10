import { readFileSync } from 'fs';
import { cwd } from 'process';
import { resolve } from 'path';
import _ from 'lodash';

const getJsonData = (filepath) => {
  const rawData = readFileSync(resolve(cwd(), filepath));
  return JSON.parse(rawData);
};

export default (filepath1, filepath2) => {
  const data1 = getJsonData(filepath1);
  const data2 = getJsonData(filepath2);
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
