#!/usr/bin/env node
import { Command } from "commander";
import { readFileSync } from "fs";
import { cwd } from "process";
import { resolve } from "path";
import _ from "lodash";

const program = new Command();
program
	.version('1.0.0')
	.arguments('<filepath1> <filepath2>')
	.description('Compares two configuration files and shows a difference.')
	.option('-f, --format [type]', 'output format')
	.action((filepath1, filepath2) => {
		const rawData1 = readFileSync(resolve(cwd(), filepath1));
		const rawData2 = readFileSync(resolve(cwd(), filepath2));
		const data1 = JSON.parse(rawData1);
		const data2 = JSON.parse(rawData2);
		const uniqueKeys = _.uniq([...Object.keys(data1), ...Object.keys(data2)]);
		const result = uniqueKeys.reduce((acc, key) => {
			if (data1.includes(key) && data2.includes(key)) {
				if (data1[key] === data2[key]) {
					acc.push(`${key}: ${data1[key]}`);
				} else {
					acc.push(`- ${key}: ${data1[key]}`);
					acc.push(`+ ${key}: ${data2[key]}`);
				}
			} else if (data1.includes(key)) {
				acc.push(`- ${key}: ${data1[key]}`);
			} else if (data2.includes(key)) {
				acc.push(`+ ${key}: ${data2[key]}`);
			}
			return result.join('/n');
		});
	});

program.parse(process.argv);