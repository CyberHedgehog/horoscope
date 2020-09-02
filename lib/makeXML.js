import xml from 'xml';
import getDateString from './getDateString';
import { convertName } from './zodiacNames';

const makeXmlObject = (zodiac, data) => {
  const date = getDateString();
  const name = convertName(zodiac);
  const nameB = name.b.toLowerCase();
  const text = data.reduce((acc, e) => {
    const type = e.type === '' ? 'Oбщий' : e.type;
    const h2 = `${type}. Гороскоп для ${nameB} на ${date}`;
    return [...acc, { h2 }, { p: e.text }];
  }, []);
  const base = {
    horoscope: [
      {
        [zodiac]: [
          { title: `Гороскоп ${nameB} на ${date} - Астрологический прогноз для женщин и мужчин` },
          { description: `Бесплатный гороскоп ${nameB} на ${date} для мужчин и женщин. Ежедневный онлайн гороскоп для Овна о здоровье, любви, бизнесе, дружбе и сексе для женщин и мужчин` },
          { header: `Гороскоп ${nameB} на ${date}` },
          { categories: name },
          { text },
        ],
      },
    ],
  };
  return xml(base);
};

export default makeXmlObject;
