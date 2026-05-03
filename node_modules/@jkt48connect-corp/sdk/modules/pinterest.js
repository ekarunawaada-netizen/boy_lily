const fetchData = require("../utils/fetchData");

async function Pinterest(apiKey, query) {
  const apiUrl = `https://api.jkt48connect.my.id/api/pin?query=${encodeURIComponent(query)}&api_key=${apiKey}`;
  const response = await fetchData(apiUrl); // Mendapatkan data dari API
  return response; // Mengembalikan respons data langsung
}

module.exports = { Pinterest };
