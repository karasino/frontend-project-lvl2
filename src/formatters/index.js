import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const validFormatters = ['stylish', 'plain', 'json'];

export default (formatterName, diffObj) => {
  if (!validFormatters.includes(formatterName)) {
    throw new Error('Unsuppurted formatter!');
  }
  const formatters = {
    stylish,
    plain,
    json,
  };
  return formatters[formatterName](diffObj);
};
