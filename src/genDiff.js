import { extname, resolve } from 'path';
import { readFileSync } from 'fs';
import parse from './parsers.js';
import format from './formatters/index.js';
import genDiffTree from './genDiffTree.js';

const getDataFromFile = (filepath) => {
  const dataType = extname(filepath).slice(1);
  const rawData = readFileSync(resolve(process.cwd(), filepath));
  return parse(rawData, dataType);
};

export default (filepath1, filepath2, formatterName = 'stylish') => {
  const data1 = getDataFromFile(filepath1);
  const data2 = getDataFromFile(filepath2);
  const diffTree = genDiffTree(data1, data2);
  return format(diffTree, formatterName);
};
