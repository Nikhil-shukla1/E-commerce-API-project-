// @see https://docs.aircode.io/guide/functions/

const aircode = require('aircode');
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports.verifyToken = async function(context) {
  let token;
  let authHeader = context.headers.authorization || context.headers.Authorization;

  console.log(authHeader);
  if(authHeader && authHeader.startsWith('Bearer')){
    token = authHeader.split(" ")[1]; // we will get the token
    console.log(token);
    try{
      const user = await jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
      
      return user;
    }catch(err){
      return null
    }
  }
  if(!token){
    return null
  }
};
