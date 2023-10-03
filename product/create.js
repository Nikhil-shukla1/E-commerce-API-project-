// @see https://docs.aircode.io/guide/functions/
const aircode = require('aircode');
const { verifyToken } = require('../helper/verifyToken');

module.exports = async function (params, context) {
  const userToken = await verifyToken(context);
  if (userToken != null && userToken.isAdmin) {
    const { title, description, inStock, catagory, color, size,price } = params;

    if (!title || !catagory || !price) {
      context.status(400);
      return {
        message: 'title, catagory and price is madatory',
      };
    }
    const productTable = aircode.db.table('product');

    const productExist  = await productTable
    .where({title})
    .findOne()

    if(productExist){
      context.status(400);
      return{
        'message':'product aleray exist',
      }
    }
    try{
      const result= await productTable.save(params);
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
    context.status(401);
    return {
      message: 'user is not authorized',
    };
  }
  console.log('Received params:', params);
  return {
    message: 'Hi, AirCode.',
  };
};
