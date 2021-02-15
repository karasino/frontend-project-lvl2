import { extname, resolve } from 'path';
import { readFileSync } from 'fs';
import parse from './parsers.js';
import format from './formatters/index.js';
import genAST from './genAST.js';

const getDataFromFile = (filepath) => {
  const file1Extension = extname(filepath);
  const rawData = readFileSync(resolve(process.cwd(), filepath));
  const data = parse(file1Extension, rawData);
  return data;
};

export default (filepath1, filepath2, formatterName = 'stylish') => {
  const data1 = getDataFromFile(filepath1);
  const data2 = getDataFromFile(filepath2);
  const ast = genAST(data1, data2);
  return format(formatterName, ast);
};
