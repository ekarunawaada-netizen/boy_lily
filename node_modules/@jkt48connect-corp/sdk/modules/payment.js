const fetchData = require("../utils/fetchData");

async function createPayment(apiKey, amount, qris) {
  const url = `https://api.jkt48connect.my.id/api/orkut/createpayment?amount=${amount}&qris=${qris}&api_key=${apiKey}`;
  const response = await fetchData(url); // Mendapatkan data dari API
  return response; // Mengembalikan respons untuk diproses lebih lanjut
}

async function checkPaymentStatus(apiKey, merchantId, keyOrkut) {
  const url = `https://api.jkt48connect.my.id/api/orkut/cekstatus?merchant=${merchantId}&keyorkut=${keyOrkut}&api_key=${apiKey}`;
  const response = await fetchData(url); // Mendapatkan data dari API
  return response; // Mengembalikan respons untuk diproses lebih lanjut
}

module.exports = { createPayment, checkPaymentStatus };