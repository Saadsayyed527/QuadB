
const axios = require('axios');
const Crypto = require('../models/Crypto');

exports.fetchAndStoreCryptos = async (req, res) => {
  try {
    const { data } = await axios.get('https://api.wazirx.com/api/v2/tickers');

    const top10 = Object.keys(data).slice(0, 10).map((key) => {
      const crypto = data[key];
      return {
        name: key,
        last: crypto.last,
        buy: crypto.buy,
        sell: crypto.sell,
        volume: crypto.volume,
        base_unit: crypto.base_unit,
      };
    });

    await Crypto.deleteMany({});
    await Crypto.insertMany(top10);

    res.status(200).json({ message: 'Top 10 cryptos fetched and stored successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching and storing data', error: error.message });
  }
};

exports.getCryptos = async (req, res) => {
  try {
    const cryptos = await Crypto.find();
    res.status(200).json(cryptos);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching data from database', error: error.message });
  }
};
