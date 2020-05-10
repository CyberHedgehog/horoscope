#!/usr/bin/env node
import program from 'commander';
import load from '../loader';
import render from '../renderToFile';
import _ from 'lodash';

program
  .description('Parse horoscopes')
  .arguments('<outdir>')
  .option('-o, --output', 'output directory')
  .parse(process.argv);

const { args } = program;
const [outPath] = program.output ? args : ['./'];

load(outPath)
  .then((coll) => {
    render(coll, outPath);
  })
  .catch((err) => console.log('error'));