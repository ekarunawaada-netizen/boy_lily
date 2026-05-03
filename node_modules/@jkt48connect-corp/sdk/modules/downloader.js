const fetchData = require("../utils/fetchData");

async function downloadTiktok(apiKey, url) {
  const apiUrl = `https://api.jkt48connect.my.id/api/downloader/tiktok?url=${encodeURIComponent(url)}&api_key=${apiKey}`;
  const response = await fetchData(apiUrl); // Mendapatkan data dari API
  return response; // Mengembalikan respons data langsung
}

module.exports = { downloadTiktok };