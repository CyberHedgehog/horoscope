const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

export default () => {
  const date = new Date();
  return `${date.getDay()} ${months[date.getMonth()]} ${date.getFullYear()}`;
};
