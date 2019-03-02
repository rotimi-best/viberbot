const { usersDb } = require('../index');

/*
DB SCHEMA
const user = {
  leadId: Number,
  telegramId: Number,
  searchResult
}
*/


const addUser = params => {
  return new Promise(async (resolve, reject) => {
    try {
      const found = await usersDb.insert(params);
      
      console.log('Adding user to db');
      
      resolve(found);
    } catch (error) {
      reject(`Add User: ${error}`);
    }
  });
};

const getUser = params => {
  return new Promise(async (resolve, reject) => {
    try {
      const found = await usersDb.find(params);

      console.log('Getting user from db');
      
      resolve(found);
    } catch (error) {
      reject(`Get User: ${error}`);
    }
  });
};

const updateUser = (findField, setField) => {
  return new Promise(async (resolve, reject) => {
    try {
      await usersDb.update(findField, setField);
      
      console.log('Updating user in db');
      
      resolve(true);
    } catch (error) {
      reject(`Update User: ${error}`);
    }
  });
};

module.exports = {
  addUser,
  getUser,
  updateUser
};
