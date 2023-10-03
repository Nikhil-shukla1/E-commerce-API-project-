// @see https://docs.aircode.io/guide/functions/


//this is for admin only
const aircode = require('aircode');
const { verifyToken } = require('../helper/verifyToken');

module.exports = async function (params, context) {
  const tokenUser = await verifyToken(context);
  if (tokenUser != null && tokenUser.isAdmin) {
    const cartTable = aircode.db.table('cart');

    const cartData = await cartTable
      .where()
      .find();

    const count = await cartTable.where().count();

    return {
      count,
      cartData,
    };
  }else{
    return{
      "message":"Access denied"
    }
  }
};

