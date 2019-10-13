const isNumeric = (n) => {
  return !Number.isNaN(parseFloat(n)) && Number.isFinite(n)
}

module.exports = {isNumeric};
