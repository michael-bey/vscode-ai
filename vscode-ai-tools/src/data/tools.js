// Import tools data from JSON file
import toolsData from './tools.json';

// Export tools array from the JSON data
export const tools = toolsData.tools;

export const getAllTags = () => {
  const tagsSet = new Set();
  tools.forEach(tool => {
    tool.tags.forEach(tag => tagsSet.add(tag));
  });
  return Array.from(tagsSet);
};

export const getAllFeatures = () => {
  const featuresSet = new Set();
  tools.forEach(tool => {
    tool.features.forEach(feature => featuresSet.add(feature));
  });
  return Array.from(featuresSet);
};

export const getAllCompanies = () => {
  const companiesSet = new Set();
  tools.forEach(tool => {
    companiesSet.add(tool.company);
  });
  return Array.from(companiesSet);
};

export const getAllTypes = () => {
  const typesSet = new Set();
  tools.forEach(tool => {
    if (tool.type) {
      typesSet.add(tool.type);
    }
  });
  return Array.from(typesSet);
};

export const getAllLicenseTypes = () => {
  return ["Open Source", "Closed Source"];
};
