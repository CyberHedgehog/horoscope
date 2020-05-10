#!/usr/bin/env node
import program from 'commander';
import load from '../loader';
import render from '../renderToFile';
import _ from 'lodash';

// load().then((coll) => {
//   const aries = _.find(coll, (o) => o.name === 'aries');
//   const res = aries.horoscope.reduce((acc, elem) => {
//     return [...acc, `<h3>${elem.head}</h3>\n<p>${elem.male}</p>`];
//   }, []);
//   console.log(res.join('\n'));
// });

// load().then((coll) => {
//   render(coll);
// });

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