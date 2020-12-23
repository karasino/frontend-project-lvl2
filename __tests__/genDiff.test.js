import { readFileSync } from 'fs';
import { cwd } from 'process';
import { resolve, join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { test, expect, beforeAll } from '@jest/globals';
import genDiff from '../src/genDiff';
import format from '../src/stylish';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);

let jsonFilepath1;
let jsonFilepath2;
let yamlFilepath1;
let yamlFilepath2;
let result;

beforeAll(() => {
  jsonFilepath1 = getFixturePath('file1.json');
  jsonFilepath2 = getFixturePath('file2.json');
  yamlFilepath1 = getFixturePath('file1.yml');
  yamlFilepath2 = getFixturePath('file2.yml');
  const resultFilepath = getFixturePath('result.txt');
  result = readFileSync(resolve(cwd(), resultFilepath), 'utf-8');
});

test('genDiff json json', () => {
  const actual = format(genDiff(jsonFilepath1, jsonFilepath2));
  expect(actual).toBe(result);
});

test('genDiff yaml yaml', () => {
  const actual = format(genDiff(yamlFilepath1, yamlFilepath2));
  expect(actual).toBe(result);
});

test('genDiff json yaml', () => {
  const actual = format(genDiff(jsonFilepath1, yamlFilepath2));
  expect(actual).toBe(result);
});

test('genDiff yaml json', () => {
  const actual = format(genDiff(yamlFilepath1, jsonFilepath2));
  expect(actual).toBe(result);
});
