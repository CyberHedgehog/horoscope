import async from 'async'; 
import axios from 'axios';
import parse from './parser';
import _ from 'lodash';

const horoscopeTypes = ['horoscope', 'love-horoscope', 'finance-horoscope', 'career-horoscope', 'health-horoscope', 'biz-horoscope'];
const zodiacs = ['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'];
const rootUrl = 'https://astrohelper.ru/';
const getLinks = (zodiac, horoscopes) => {
  const links = horoscopes.map((h) => {
    const url = new URL(`/${h}/${zodiac}`, rootUrl);
    return url.toString();
  });
  return links;
}

const getParcedData = async (link) => {
  const response = await axios.get(link);
  return parse(response.data);
};

export default async () => {
  const promises = zodiacs.map(async (z) => {
    const data = horoscopeTypes.map(async (h) => {
      const url = new URL(`/${h}/${z}/tomorrow`, rootUrl);
      return getParcedData(url.toString());
    });
    const res = await Promise.all(data);
    return { name: z, horoscope: res };
  });
  const result = await Promise.all(promises);
  return result;
}