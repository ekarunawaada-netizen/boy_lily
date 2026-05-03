const fetchData = require("../utils/fetchData");

async function checkApiKey(apiKey) {
  const url = `https://api.jkt48connect.my.id/api/check-apikey/${apiKey}`;
  const response = await fetchData(url); // Mendapatkan data dari API
  return response; // Mengembalikan respons data langsung
}

module.exports = checkApiKey;
