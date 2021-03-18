import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const formatters = {
  stylish,
  plain,
  json,
};

export default (diffNodes, formatName) => {
  if (!Object.keys(formatters).includes(formatName)) {
    throw new Error('Unsupported format!');
  }
  return formatters[formatName](diffNodes);
};
