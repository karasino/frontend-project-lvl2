import { readFileSync } from 'fs';
import { cwd } from 'process';
import { resolve } from 'path';
import yaml from 'js-yaml';

const getJsonData = (filepath) => {
  const rawData = readFileSync(resolve(cwd(), filepath));
  return JSON.parse(rawData);
};

const getYamlData = (filepath) => {
  const rawData = readFileSync(resolve(cwd(), filepath));
  return yaml.safeLoad(rawData);
};

export default {
  '.json': getJsonData,
  '.yml': getYamlData,
};
