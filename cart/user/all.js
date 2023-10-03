// @see https://docs.aircode.io/guide/functions/

//for all user
const aircode = require('aircode');
const { verifyToken } = require('../../helper/verifyToken');

module.exports = async function (params, context) {
  const tokenUser = await verifyToken(context);
  if (tokenUser != null) {
    const cartTable = aircode.db.table('cart');

    const cartData = await cartTable
      .where({userId:tokenUser._id})
      .find();

    const count = await cartTable
      .where()
      .count();

    return {
      count,
      cartData,
    };
  } else {
    context.stauts(400);
    return {
      message: 'token invalid or user is not authorized!',
    };
  }
};
