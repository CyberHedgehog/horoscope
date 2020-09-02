export const names = {
  aries: { a: 'Овен', b: 'Овна' },
  taurus: { a: 'Телец', b: 'Тельца' },
  gemini: { a: 'Близнецы', b: 'Близнецов' },
  cancer: { a: 'Рак', b: 'Рака' },
  leo: { a: 'Лев', b: 'Льва' },
  virgo: { a: 'Дева', b: 'Девы' },
  libra: { a: 'Весы', b: 'Весов' },
  scorpio: { a: 'Скорпион', b: 'Скорпиона' },
  sagittarius: { a: 'Стрелец', b: 'Стрельца' },
  capricorn: { a: 'Козерог', b: 'Козерога' },
  aquarius: { a: 'Водолей', b: 'Водолея' },
  pisces: { a: 'Рыбы', b: 'Рыб' },
};

export const convertName = (name) => names[name];
