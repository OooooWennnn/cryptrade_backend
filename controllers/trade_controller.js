const getAllCoins_Ndax = async (req, res) => {
  try {
    const response = await fetch('https://api.ndax.io:8443/AP/summary');
    if (!response.ok) {
      throw new Error('Error loading data from NDAX');
    }
    const data = await response.json();
    const filteredData = filterOnlyCad(data);
    const sortedData = sortByVolume(filteredData);
    console.log(sortedData);
    res.status(201).json(sortedData);
  } catch (error) {
    res.status(500).send('An error occurred while fetching coin data.');
  }
};

const sortByVolume = (data) => {
  return data.slice().sort((a, b) => b.quote_volume - a.quote_volume);
};

const filterOnlyCad = (data) => {
  return data.filter((coin) => {
    return coin.trading_pairs.split('_')[1] === 'CAD';
  });
};

const fetchInstrumentId = async (symbol) => {
  try {
    const response = await fetch(
      'https://api.ndax.io:8443/AP/getInstruments?omsid=1'
    );

    if (!response.ok) {
      throw new Error('An error occurred while fetching instruments');
    }

    const instruments = await response.json();
    const result = instruments.find((coin) => coin.Symbol === symbol);

    return result.InstrumentId;
  } catch (error) {
    console.log('An error occurred while fetching the instrument id.', error);
  }
};

const fetchTickerHistory = async (req, res) => {
  try {
    console.log(req.body.symbol);
    const instrumentId = await fetchInstrumentId(req.body.symbol);
    const currentDate = new Date().toISOString().split('T')[0];
    const date30DaysAgo = new Date();
    date30DaysAgo.setDate(date30DaysAgo.getDate() - 5000);
    const fromDate = date30DaysAgo.toISOString().split('T')[0];
    const interval = 60 * 60 * 24;

    const response = await fetch(
      `https://api.ndax.io:8443/AP/GetTickerHistory?InstrumentId=${instrumentId}&Interval=${interval}&FromDate=${fromDate}&ToDate=${currentDate}&OMSId=1`
    );

    if (!response.ok) {
      throw new Error('An error occurred while fetching the ticker history');
    }

    const result = await response.json();
    console.log(result);

    res.status(201).json(result);
  } catch (error) {
    res.status(500).send('An error occurred while fetching ticker history.');
  }
};

module.exports = {
  getAllCoins_Ndax,
  fetchTickerHistory,
};
