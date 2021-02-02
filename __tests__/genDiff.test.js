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

describe('test stylish formatter with different file types', () => {
  test.each([
    [jsonFilepath1, jsonFilepath2, resultStylish, 'stylish'],
    [jsonFilepath1, yamlFilepath2, resultStylish, 'stylish'],
    [yamlFilepath1, jsonFilepath2, resultStylish, 'stylish'],
    [yamlFilepath1, yamlFilepath2, resultStylish, 'stylish'],
  ])('comparison %#', (filepath1, filepath2, expected, formatter) => {
    const actual = genDiff(filepath1, filepath2, formatter);
    expect(actual).toBe(expected);
  });
});

describe('test plain formatter with different file types', () => {
  test.each([
    [jsonFilepath1, jsonFilepath2, resultPlain, 'plain'],
    [jsonFilepath1, yamlFilepath2, resultPlain, 'plain'],
    [yamlFilepath1, jsonFilepath2, resultPlain, 'plain'],
    [yamlFilepath1, yamlFilepath2, resultPlain, 'plain'],
  ])('comparison %#', (filepath1, filepath2, expected, formatter) => {
    const actual = genDiff(filepath1, filepath2, formatter);
    expect(actual).toBe(expected);
  });
});

describe('test json formatter with different file types', () => {
  test.each([
    [jsonFilepath1, jsonFilepath2, resultJson, 'json'],
    [jsonFilepath1, yamlFilepath2, resultJson, 'json'],
    [yamlFilepath1, jsonFilepath2, resultJson, 'json'],
    [yamlFilepath1, yamlFilepath2, resultJson, 'json'],
  ])('comparison %#', (filepath1, filepath2, expected, formatter) => {
    const actual = genDiff(filepath1, filepath2, formatter);
    expect(actual).toBe(expected);
  });
});

describe('test negative cases', () => {
  test('unsupported file extension', () => {
    expect(() => {
      genDiff(txtFilepath, jsonFilepath2);
    }).toThrow();
  });

  test('unsupported formatter', () => {
    expect(() => {
      genDiff(jsonFilepath1, jsonFilepath2, 'superformatter');
    }).toThrow();
  });
});
