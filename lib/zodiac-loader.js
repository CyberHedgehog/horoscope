import osmosis from 'osmosis';
import _ from 'lodash';

const rootUrl = 'https://astrohelper.ru/horoscope/aries/tomorrow/';
const horoscopeTypes = {
  horoscope: '',
  'love-horoscope': 'Любовь',
  'finance-horoscope': 'Финансы',
  'career-horoscope': 'Работа',
  'biz-horoscope': 'Бизнес',
  'health-horoscope': 'Здоровье',
};

const parse = (data, type) => {
  const result = {
    type,
    common: data.text[0],
    male: data.text[1],
    female: data.text[2],
  };
  return result;
};

const load = (link, type) => {
  const promise = new Promise((resolve) => {
    let result;
    osmosis.get(link)
      .find('.horoscope-text')
      .set({
        headers: ['h2'],
        text: ['p'],
      })
      .data((d) => {
        result = parse(d, type);
      })
      .done(() => resolve(result));
  });
  return promise;
};

export default async (zodiac) => {
  const promises = _.keys(horoscopeTypes).map((e) => {
    const url = new URL(`/${e}/${zodiac}/tomorrow`, rootUrl).toString();
    return load(url, horoscopeTypes[e]);
  });
  const data = await Promise.all(promises);
  return data;
};
