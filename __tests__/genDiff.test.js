import { fileURLToPath } from 'url';
import path from 'path';
import { test, expect } from '@jest/globals';
import genJsonDiff from '../src/genDiff';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('genDiff json json', () => {
  const filepath1 = getFixturePath('file1.json');
  const filepath2 = getFixturePath('file2.json');
  const expected = 'host: hexlet.io\n- timeout: 50\n+ timeout: 20\n- proxy: 123.234.53.22\n- follow: false\n+ verbose: true';
  const actual = genJsonDiff(filepath1, filepath2);
  expect(actual).toBe(expected);
});

test('genDiff yaml yaml', () => {
  const filepath1 = getFixturePath('file1.yml');
  const filepath2 = getFixturePath('file2.yml');
  const expected = 'host: hexlet.io\n- timeout: 50\n+ timeout: 20\n- proxy: 123.234.53.22\n- follow: false\n+ verbose: true';
  const actual = genJsonDiff(filepath1, filepath2);
  expect(actual).toBe(expected);
});

test('genDiff json yaml', () => {
  const filepath1 = getFixturePath('file1.json');
  const filepath2 = getFixturePath('file2.yml');
  const expected = 'host: hexlet.io\n- timeout: 50\n+ timeout: 20\n- proxy: 123.234.53.22\n- follow: false\n+ verbose: true';
  const actual = genJsonDiff(filepath1, filepath2);
  expect(actual).toBe(expected);
});

test('genDiff yaml json', () => {
  const filepath1 = getFixturePath('file1.yml');
  const filepath2 = getFixturePath('file2.json');
  const expected = 'host: hexlet.io\n- timeout: 50\n+ timeout: 20\n- proxy: 123.234.53.22\n- follow: false\n+ verbose: true';
  const actual = genJsonDiff(filepath1, filepath2);
  expect(actual).toBe(expected);
});
