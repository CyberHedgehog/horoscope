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

export default (domain) => {
  const zodiacs = _.keys(names);
  const dateTomorrow = makeDate('en', 'tomorrow').replace(/ /g, '-');
  const dateAfterTomorrow = makeDate('en', 'afterTomorrow').replace(/ /g, '-');
  const tomorrowLinks = zodiacs.map((z) => `/horoscope-${z}-on-${dateTomorrow}/`);
  const afterTomorrowLinks = zodiacs.map((z) => `/horoscope-${z}-on-${dateAfterTomorrow}/`);
  const linksWithCategory = zodiacs.map((z) => `/category/${z}/`);
  const result = codes
    .map((code) => [domain, code].join('/'))
    .reduce((acc, item) => {
      const urlsWithDomains = [...tomorrowLinks, ...afterTomorrowLinks, ...linksWithCategory].map((l) => `${item}${l}`);
      return [...acc, ...urlsWithDomains];
    }, []);
  return result;
};
