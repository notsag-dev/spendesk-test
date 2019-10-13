module.exports = {
  conversionFee: 0.029,
  dbName: process.env.NODE_ENV === 'test' ? 'test/test.db' : 'spendesk.db'
}
