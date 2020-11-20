import _ from 'lodash';
import makeDate from './getDateString';
import { names } from './zodiacNames';

const codes = [
  'af', 'sq', 'am', 'ar', 'hy', 'az', 'eu', 'be',
  'bn', 'bs', 'bg', 'ca', 'ceb', 'ny', 'zh-CN', 'zh-TW',
  'co', 'hr', 'cs', 'da', 'nl', 'en', 'eo', 'et',
  'tl', 'fi', 'fr', 'fy', 'gl', 'ka', 'de', 'el',
  'gu', 'ht', 'ha', 'haw', 'hi', 'hmn', 'hu', 'is',
  'ig', 'id', 'ga', 'it', 'ja', 'kn', 'kk', 'km',
  'ko', 'ku', 'ky', 'lo', 'la', 'lv', 'lt', 'lb',
  'mk', 'mg', 'ms', 'ml', 'mt', 'mi', 'mr', 'mn',
  'my', 'ne', 'no', 'ps', 'fa', 'pl', 'pt', 'pa',
  'ro', 'sm', 'gd', 'sr', 'st', 'sn', 'sd', 'si',
  'sk', 'sl', 'so', 'es', 'su', 'sw', 'sv', 'tg',
  'ta', 'te', 'th', 'tr', 'uk', 'ur', 'uz', 'vi',
  'cy', 'xh', 'yi', 'yo', 'zu',
];

const domain = 'https://my-horoscope.online';

export default () => {
  const zodiacs = _.keys(names);
  const date = makeDate('en').replace(/ /g, '-');
  const links = codes.reduce((acc, code) => {
    const result = zodiacs.map((z) => `${domain}/${code}/horoscope-${z}-on-${date}/`);
    return [...acc, ...result];
  }, []);
  return links;
};
