import { readFileSync } from 'fs';
import { cwd } from 'process';
import { resolve, join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { test, expect, beforeAll } from '@jest/globals';
import genDiff from '../src/genDiff';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);

let jsonFilepath1;
let jsonFilepath2;
let yamlFilepath1;
let yamlFilepath2;
let resultStylish;
let resultPlain;

beforeAll(() => {
  jsonFilepath1 = getFixturePath('file1.json');
  jsonFilepath2 = getFixturePath('file2.json');
  yamlFilepath1 = getFixturePath('file1.yml');
  yamlFilepath2 = getFixturePath('file2.yml');
  const resultStylishFilepath = getFixturePath('resultStylish.txt');
  const resultPlainFilepath = getFixturePath('resultPlain.txt');
  resultStylish = readFileSync(resolve(cwd(), resultStylishFilepath), 'utf-8');
  resultPlain = readFileSync(resolve(cwd(), resultPlainFilepath), 'utf-8');
});

test('genDiff stylish json json', () => {
  const actual = genDiff(jsonFilepath1, jsonFilepath2);
  expect(actual).toBe(resultStylish);
});

test('genDiff plain yaml yaml', () => {
  const actual = genDiff(yamlFilepath1, yamlFilepath2, 'plain');
  expect(actual).toBe(resultPlain);
});

test('genDiff stylish json yaml', () => {
  const actual = genDiff(jsonFilepath1, yamlFilepath2);
  expect(actual).toBe(resultStylish);
});

test('genDiff plain yaml json', () => {
  const actual = genDiff(yamlFilepath1, jsonFilepath2, 'plain');
  expect(actual).toBe(resultPlain);
});
