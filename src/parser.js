import cheerio from 'cheerio';
import _ from 'lodash';

const getNodeNum = {
  male: 1,
  female: 3,
};

export default (str, gender) => {
  const nodeNum = getNodeNum[gender];
  const dom = cheerio.load(str);
  const nodesList = dom('.horoscope-text')[0].childNodes;
  const head = dom('h1')[0].children[0].data
  const common = nodesList[0].children[0].data;
  const male = nodesList[2].children[0].data;
  const female = nodesList[4].children[0].data;
  return { head, common, male, female };
}