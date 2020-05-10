import _ from 'lodash';
import path from 'path';
import fs from 'fs';

const gender = ['male', 'female', 'common'];

const words = {
  'Люб': 'Любовь',
  'зд': 'Здоровье',
  'Фи': 'Финансы',
  'работы': 'Работа',
  'Биз': 'Бизнес',
};

const changeHeader = (header) => {
  const keys = _.keys(words);
  let newHeader;
  keys.forEach((k) => {
    if(header.includes(k)) {
      newHeader = words[k];
    }
  });
  return newHeader;
};

const saveToFiles = (coll, zod, dir, gen) => {
  const contentArr = _.find(coll, (o) => o.name === zod).horoscope.reduce((acc, elem) => {
    const head = changeHeader(elem.head);
    return [...acc, `<h3>${head}</h3>\n<p>${elem[gen]}</p>`];
  }, []);
  const contentStr = _.drop(contentArr.join('\n').split('\n')).join('\n');
  const filePath = path.join(dir, `${zod}_${gen}.txt`);
  fs.writeFile(filePath, contentStr, () => {});
}

const render = async (coll, outDir) => {
  const zod = coll.map((z) => z.name);
  zod.map((z) => {
    return gender.map((g) => saveToFiles(coll, z, outDir, g));
  });
}

export default render;