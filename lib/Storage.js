import _ from 'lodash';

class Storage {
  constructor() {
    this.storage = {};
  }

  set(key, value) {
    this.storage[key] = value;
  }

  get(key) {
    return this.storage[key];
  }

  keys() {
    return _.keys(this.storage);
  }
}

export default Storage;
