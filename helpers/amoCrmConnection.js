require("dotenv").config();

const amoClients = require('npm-api-client-amocrm');
const amoClient = amoClients.default();
const { DEMO_SUB_DOMAIN, DEMO_LOGIN, DEMO_CRM_API_KEY } = process.env;

let auth = null;

module.exports = {
  async get() {
    if (!auth) {
      const amoCrm = await amoClient.auth(DEMO_SUB_DOMAIN, DEMO_LOGIN, DEMO_CRM_API_KEY);
      
      if (amoCrm.auth === true) {
        console.log('Connected to AMOCRM');
        
        auth = amoClient;
      } else {
        console.log('Could not connect to AMMOCRM');
      }
    }

    return auth;
  }
};
