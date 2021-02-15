import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { test, expect, describe } from '@jest/globals';
import genDiff from '../src/genDiff';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);
const getFixture = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

const jsonFilepath1 = getFixturePath('file1.json');
const jsonFilepath2 = getFixturePath('file2.json');
const yamlFilepath1 = getFixturePath('file1.yml');
const yamlFilepath2 = getFixturePath('file2.yml');
const txtFilepath = getFixturePath('file1.txt');
const resultStylish = getFixture('resultStylish.txt');
const resultPlain = getFixture('resultPlain.txt');
const resultJson = getFixture('resultJson.json');

describe('test genDiff', () => {
  test.each([
    [jsonFilepath1, jsonFilepath2, undefined, resultStylish],
    [jsonFilepath1, yamlFilepath2, 'stylish', resultStylish],
    [yamlFilepath1, jsonFilepath2, 'plain', resultPlain],
    [jsonFilepath1, yamlFilepath2, 'json', resultJson],
  ])('comparison %#', (filepath1, filepath2, formatter, expected) => {
    const actual = genDiff(filepath1, filepath2, formatter);
    expect(actual).toBe(expected);
  });

  test('unsupported file extension', () => {
    expect(() => {
      genDiff(txtFilepath, jsonFilepath2);
    }).toThrowError('Unsupported file extension!');
  });

  test('unsupported formatter', () => {
    expect(() => {
      genDiff(jsonFilepath1, jsonFilepath2, 'yaml');
    }).toThrowError('Unsupported format!');
  });
});
