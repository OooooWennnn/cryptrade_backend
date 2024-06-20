const getAllCoins_Ndax = async (req, res) => {
  try {
    const response = await fetch('https://api.ndax.io:8443/AP/summary');
    if (!response.ok) {
      throw new Error('Error loading data from NDAX');
    }
    const data = await response.json();
    console.log(data);
    res.status(201).json(data);
  } catch (error) {
    res.status(500).send('An error occurred while fetching Ndax crypto data.');
  }
};

const getAllCoins_Bithum = async (req, res) => {
  try {
    const response = await fetch(
      'https://api.bithumb.com/public/orderbook/ALL_KRW'
    );
    if (!response.ok) {
      throw new Error('Error loading data from Bithum');
    }
    const data = await response.json();
    console.log(data);
    res.status(201).json(data);
  } catch (error) {
    res.status(500).send('An error occurred while fetching Bithum crypto data');
  }
};

module.exports = {
  getAllCoins_Ndax,
  getAllCoins_Bithum,
};
