import _ from 'lodash';
import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const formatters = {
  stylish,
  plain,
  json,
};

export default (diffTree, formatName) => {
  if (!_.has(formatters, formatName)) {
    throw new Error('Unsupported format!');
  }
  return formatters[formatName](diffTree);
};
