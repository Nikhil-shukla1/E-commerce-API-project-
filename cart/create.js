// @see https://docs.aircode.io/guide/functions/
const aircode = require('aircode');
const { verifyToken } = require('../helper/verifyToken');

module.exports = async function (params, context) {
  const userToken = await verifyToken(context);
  if (userToken != null ) {
    const { products } = params;

    if (!products ) {
      context.status(400);
      return {
        message: 'title, catagory and price is madatory',
      };
    }
    const cartTable = aircode.db.table('cart');

    try{
      const cart ={
        ...params,
        userId:userToken._id
      }
      const result= await cartTable.save(cart);
      context.status(201);
      return{
         result,
        }
    }catch(err){
      context.status(500);
      return{
        'message':err.message,
      }
    }
  } else {
    context.status(401)
    return {
      message: 'user is not authorized',
    }
  }
  console.log('Received params:', params);
  return {
    message: 'Hi, AirCode.',
  };
};