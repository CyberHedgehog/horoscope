import _ from 'lodash';
import loader from './zodiac-loader';
import { names } from './zodiacNames';

const list = _.keys(names).map(async (z) => {
  const data = await loader(z);
  return { [z]: data };
});

export default (storage) => Promise.all(list).then((data) => {
  data.map((e) => {
    const [name] = _.keys(e);
    storage.set(name, e[name]);
    return null;
  });
});
