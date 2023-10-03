const aircode = require('aircode');
const { verifyToken } = require('../helper/verifyToken');

module.exports = async function (params, context) {
  const tokenUser = await verifyToken(context);
  console.log(tokenUser);
  if (tokenUser != null) {
    
    const { _id } = tokenUser;
    const { name } = params;
    
    const userTable = aircode.db.table('user');

    try {
      const user = await userTable.where({ _id }).projection({isAdmin: 0, password: 0, accessToken: 0}).findOne();

      user.name = name;
      
      await userTable.save(user);
      context.status(200);
      return {
        ...user,
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