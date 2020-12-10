import { Command } from 'commander';
import genJsonsDiff from './src/genjsondiff';

const program = new Command();
program
  .version('1.0.0')
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .action(genJsonsDiff);

export { program as default };
