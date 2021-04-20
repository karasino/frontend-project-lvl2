import yaml from 'js-yaml';

const validExtensions = ['json', 'yml'];
const parsers = {
  json: JSON.parse,
  yml: yaml.safeLoad,
};

export default (rawData, dataType) => {
  if (!validExtensions.includes(dataType)) {
    throw new Error('Unsupported file extension!');
  }
  return parsers[dataType](rawData);
};
