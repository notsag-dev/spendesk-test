const {isNumeric} = require('../utils');

const auth = (req, res, next) => {
  const userId = parseInt(req.get('user-id'), 10);
  const companyId = parseInt(req.get('company-id'), 10);
  if (!userId || !companyId || !isNumeric(userId) || !isNumeric(companyId)) {
    res.status(401).send({message: 'Authentication failed'});
  } else {
    next();
  }
}

module.exports = {auth};
