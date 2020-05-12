import _ from 'lodash';

const tagsList = ['#астрология', '#гороскоп', '#бизнес', '#любовь', '#финансы', '#работа', '#здоровье'];
const genTags = {
  male: '#мужскойгороскоп',
  female: '#женскийгороскоп',
  common: '#ежедневныйгороскоп',
};

export default (zodiac) => {
  const zodTag = `#${_.toLower(zodiac)}`;
  const commonTags = _.concat(tagsList, zodTag, genTags.common).join(' ');
  const maleTags = _.concat(tagsList, zodTag, genTags.male).join(' ');
  const femaleTags = _.concat(tagsList, zodTag, genTags.female).join(' ');
  return { commonTags, maleTags, femaleTags };
};
