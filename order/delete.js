// @see https://docs.aircode.io/guide/functions/
const aircode = require('aircode');
const { verifyToken } = require('../helper/verifyToken.js');


module.exports = async function (params, context) {
  const tokenUser = await verifyToken(context);
  console.log(tokenUser);
  
  if (tokenUser != null && tokenUser.isAdmin) {
    const { _id } = params;
    
    const orderTable = aircode.db.table('order');

    try {
          const order = await orderTable.where({ _id }).findOne();
      
      const result = await orderTable.delete(order);
      context.status(204);
      return {
        result,
      };
    } catch (err) {
      context.status(500);
      return {
        message: err.message,
      };
    }
  } else {
    context.status(401);
    return {
      message: 'Invalid token or user is not authorized',
    };
  }
  console.log('Received params:', params);
};
