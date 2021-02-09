import yaml from 'js-yaml';

const getJsonData = (rawData) => JSON.parse(rawData);

const getYamlData = (rawData) => yaml.safeLoad(rawData);

const validExtensions = ['.json', '.yml'];

export default (fileExtension, rawData) => {
  if (!validExtensions.includes(fileExtension)) {
    throw new Error('Unsupported file extension!');
  }
  const parsers = {
    '.json': getJsonData,
    '.yml': getYamlData,
  };
  return parsers[fileExtension](rawData);
};
