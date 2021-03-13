import { extname, resolve } from 'path';
import { readFileSync } from 'fs';
import parse from './parsers.js';
import format from './formatters/index.js';
import genDiffNode from './genDiffNode.js';

const getDataFromFile = (filepath) => {
  const dataType = extname(filepath);
  const rawData = readFileSync(resolve(process.cwd(), filepath));
  return parse(rawData, dataType);
};

export default (filepath1, filepath2, formatterName = 'stylish') => {
  const data1 = getDataFromFile(filepath1);
  const data2 = getDataFromFile(filepath2);
  const diffNode = genDiffNode(data1, data2);
  return format(diffNode, formatterName);
};
