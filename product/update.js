
const aircode = require('aircode');
const { verifyToken } = require('../helper/verifyToken');


module.exports = async function (params,context) {
  const tokenUser = await verifyToken(context);
  console.log(tokenUser);
  if (tokenUser != null && tokenUser.isAdmin) {

    const { _id,title, description, inStock, catagory, color, size,price } = params;
    const productTable = aircode.db.table('product');
    
    
    try {
      const product = await productTable
      .where({ _id })
      .findOne();
      
      const result = await productTable.save(params);
      context.status(200);
      return {
        ...result
      }
    } catch (err) {
      context.status(500);
      return {
        'message': err.message
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
