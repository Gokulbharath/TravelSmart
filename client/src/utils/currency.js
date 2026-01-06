export const USD_TO_INR = 83;

export const convertUSDToINR = (usdAmount) => {
  if (typeof usdAmount !== 'number' || isNaN(usdAmount)) {
    return 0;
  }
  return Math.round(usdAmount * USD_TO_INR);
};

export const formatINR = (amount) => {
  if (typeof amount !== 'number' || isNaN(amount)) {
    return '₹0';
  }
  return `₹${Math.round(amount).toLocaleString('en-IN')}`;
};

export const formatINRFromUSD = (usdAmount) => {
  const inrAmount = convertUSDToINR(usdAmount);
  return formatINR(inrAmount);
};

export const parseCurrencyString = (currencyString) => {
  if (!currencyString || typeof currencyString !== 'string') {
    return 0;
  }
  const match = currencyString.match(/[\d.]+/);
  if (!match) {
    return 0;
  }
  return parseFloat(match[0]);
};

