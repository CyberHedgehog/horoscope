import osmosis from 'osmosis';
import _ from 'lodash';

const rootUrl = 'https://orakul.com';
const horoscopeTypes = {
  more: '',
  love: 'Любовь',
  family: 'Семья',
  career: 'Работа',
  health: 'Здоровье',
  tinager: 'Подростковый',
  flirt: 'Общество',
  amigos: 'Друзья',
};

const parse = (data, type) => {
  const result = {
    type,
    common: data.text[0],
  };
  return result;
};

const load = (link, type) => {
  const promise = new Promise((resolve) => {
    let result;
    osmosis.get(link)
      .find('.horoBlock')
      .set({
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
    const url = new URL(`/horoscope/astrologic/${e}/${zodiac}/tomorrow.html`, rootUrl).toString();
    return load(url, horoscopeTypes[e]);
  });
  const data = await Promise.all(promises);
  return data;
};
