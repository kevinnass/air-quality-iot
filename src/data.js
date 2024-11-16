// data.js
const dataLog = [];

export const addDataToLog = (data) => {
  const timestamp = new Date().toISOString();
  dataLog.push({ ...data, timestamp });
};

export const getDataLog = () => {
  return [...dataLog]; // Renvoie une copie des données
};