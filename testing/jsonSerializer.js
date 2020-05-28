import { isPlainObject } from 'lodash';

export default {
  test: value => Array.isArray(value) || isPlainObject(value),
  serialize: value => JSON.stringify(value, null, 2),
};
