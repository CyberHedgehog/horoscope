const russanMonths = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
const englishMonths = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];

const getMonthsLang = {
  ru: russanMonths,
  en: englishMonths,
};

export default (lang = 'ru', day = 'afterTomorrow') => {
  const date = new Date();
  const dayNum = day === 'afterTomorrow' ? 2: 1;
  date.setDate(date.getDate() + dayNum);
  const months = getMonthsLang[lang];
  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
};
