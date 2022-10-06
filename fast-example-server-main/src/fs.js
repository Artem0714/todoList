const fs = require("fs/promises");

async function readRawData(path) {
  try {
    return await fs.readFile(path);
  } catch {
    return Buffer.from([]);
  }
}

async function readData(path) {
  try {
    const rawData = await readRawData(path);
    return JSON.parse(rawData.toString());
  } catch {
    return {};
  }
}

async function writeData(path, data) {
  await fs.writeFile(path, JSON.stringify(data, null, 2));
}

module.exports = { readRawData, readData, writeData };
