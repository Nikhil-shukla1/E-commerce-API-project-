// @see https://docs.aircode.io/guide/functions/
// @see https://docs.aircode.io/guide/functions/
const aircode = require('aircode');
const { verifyToken } = require('../../helper/verifyToken');

module.exports = async function (params, context) {
  const tokenUser = await verifyToken(context);
  if (tokenUser != null && tokenUser.isAdmin) {
    const orderTable = aircode.db.table('order');

    const orders = await orderTable
      .where()
      .find();

    const count = await orderTable.where().count();

    return {
      count,
      orders,
    };
  }else{
    return{
      "message":"only admin can acess it"
    }
  }
};
