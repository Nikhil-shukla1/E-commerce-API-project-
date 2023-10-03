// @see https://docs.aircode.io/guide/functions/
const aircode = require('aircode');
const bcrypt = require('bcrypt');

module.exports = async function (params, context) {
  console.log('Received params:', params);
  console.log('Received params:', context);

  const { name, email, password } = params;
  if (!name || !password || !email) {
    context.status(400);
    return {
      message: 'All fields are required',
    };
  }

  const userTable = aircode.db.table('user');

  const userExist = await userTable.where({ email }).findOne();
  if (userExist) {
    context.status(409);
    return {
      message: 'User Already exists',
    };
  }
  try {
    const count = await userTable
    .where()
    .count();

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { name, email, password: hashedPassword, isAdmin: false };

    if(count == 0){//first user is always admin
      newUser.isAdmin = true;
    }
    console.log("the count is:",count);
    await userTable.save(newUser);

    const result = await userTable// use to send response of the body 
    .where({email})
    .projection({password : 0, isAdmin:0})// to hind the sensitive data from the user like password 
    .find();

    console.log("this is the result :",result);
    context.status(201);
    return{
      result,
    }
  } catch (err) {
    context.status(500);
    return {
      message: err.message,
    };
  }
};
