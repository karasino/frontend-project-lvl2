import yaml from 'js-yaml';

const getJsonData = (rawData) => JSON.parse(rawData);

const getYamlData = (rawData) => yaml.safeLoad(rawData);

const validExtensions = ['json', 'yml'];

export default (rawData, dataType) => {
  if (!validExtensions.includes(dataType)) {
    throw new Error('Unsupported file extension!');
  }
  const parsers = {
    json: getJsonData,
    yml: getYamlData,
  };
  return parsers[dataType](rawData);
};
