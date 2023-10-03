// @see https://docs.aircode.io/guide/functions/
const aircode = require('aircode');
const { verifyToken } = require('../helper/verifyToken');

module.exports = async function (params, context) {
  const userToken = await verifyToken(context);
  if (userToken != null ) {
    const { products,amount,address,status } = params;

    if (!products || !amount || !address) {
      context.status(400);
      return {
        message: 'title, catagory and price is madatory',
      };
    }
    const orderTable = aircode.db.table('order');


    try{
      const order ={
        ...params,
        userId:userToken._id
      }
      const result= await orderTable.save(order);
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