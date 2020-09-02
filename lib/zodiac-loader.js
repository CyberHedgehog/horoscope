import _ from 'lodash';
import axios from 'axios';
import parser from 'fast-xml-parser';

const rootUrl = 'https://ignio.com/r/export/utf/xml/daily/';
const horoscopeTypes = {
  com: 'Общий гороскоп',
  ero: 'Эротический гороскоп',
  anti: 'Антигороскоп',
  bus: 'Бизнес-гороскоп',
  hea: 'Гороскоп здоровья',
  mob: 'Мобильный гороскоп',
  cook: 'Кулинарный гороскоп',
  lov: 'Любовный гороскоп',
};

const parse = (data, zodiac) => {
  const xml = parser.parse(data);
  return xml.horo[zodiac].tomorrow;
};

const load = async (url) => {
  const response = await axios.get(url);
  return response.data;
};

export default async (zodiac) => {
  const promises = _.keys(horoscopeTypes).map((e) => {
    const url = `${rootUrl}${e}.xml`;
    return load(url)
      .then((data) => ({
        type: [horoscopeTypes[e]],
        text: parse(data, zodiac),
      }));
  });
  const horoList = await Promise.all(promises);
  return horoList;
};
