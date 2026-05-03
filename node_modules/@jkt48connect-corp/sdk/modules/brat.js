const fetchData = require("../utils/fetchData");

async function getBrat(apiKey, text) {
  const apiUrl = `https://api.jkt48connect.my.id/api/brat?q=${encodeURIComponent(text)}&api_key=${apiKey}`;
  const response = await fetchData(apiUrl); // Mendapatkan data dari API
  return response; // Mengembalikan respons data langsung
}

module.exports = { getBrat };