import _ from 'lodash';
import stylish from './stylish.js';
import plain from './plain.js';

const formatters = {
  stylish,
  plain,
  json: JSON.stringify,
};

export default (diffTree, formatName) => {
  if (!_.has(formatters, formatName)) {
    throw new Error('Unsupported format!');
  }
  return formatters[formatName](diffTree);
};
