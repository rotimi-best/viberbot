const { log } = console;
const AmoClient = require('../../helpers/amoCrmConnection');

/**
 * Get all Leads from CRM
 * @param {array} leads Array of leads
 */
const getAllLeads = () => {
  return new Promise(async resolve => {
    const amoClient = await AmoClient.get();

    let leads = null;
  
    if (amoClient) {
      leads = await amoClient.listLeads();
    }
    log("Get all Leads from CRM");

    resolve(leads);
  });
};

/**
 * Add Leads to CRM
 * @param {array} leads Array of leads
 */
const addLeads = (leads) => {
  return new Promise(async resolve => {
    const amoClient = await AmoClient.get();
  
    const lead = await amoClient.addLeads(leads);

    log("Add Leads to CRM");

    resolve(lead)
  });
};

/**
 * Get all Companies from CRM
 * @param {array} leads Array of companies
 */
const getAllCompanies = () => {
  return new Promise(async (resolve) => {
    const amoClient = await AmoClient.get();

    let companies = null;

    if (amoClient) {
      companies = await amoClient.listCompanies({});
    }
    log("Get all Companies from CRM");

    resolve(companies);
  });
};

/**
 * Add Companies to CRM
 * @param {array} contacts Array of companies
 */
const addCompanies = (companies) => {
  return new Promise(async resolve => {
    const amoClient = await AmoClient.get();
  
    const company = await amoClient.addCompanies(companies);

    log("Add Companies to CRM");

    resolve(company);
  });
};

/**
 * Get all Contacts from CRM
 * @param {array} leads Array of contacts
 */
const getAllContacts = () => {
  return new Promise(async resolve => {
    const amoClient = await AmoClient.get();

    let contacts = null;

    if (amoClient) {
      contacts = await amoClient.listContacts();
    }

    log("Get all Contacts from CRM");

    resolve(contacts);
  });
};

/**
 * Add Contacts to CRM
 * @param {array} contacts Array of contacts
 */
const addContacts = (contacts) => {
  return new Promise(async resolve => {
    const amoClient = await AmoClient.get();
  
    const contact = await amoClient.addContacts(contacts);

    log("Add Contacts to CRM");

    resolve(contact);
  });
};

/**
 * Add Notes to CRM
 * @param {array} leads Array of notes
 */
const addNotes = (notes) => {
  return new Promise(async resolve => {
    const amoClient = await AmoClient.get();
    
    const note = await amoClient.addNotes(notes);

    log("Add Notes to CRM");
    
    resolve(note);
  });
};

module.exports = {
  getAllLeads,
  addLeads,
  getAllCompanies,
  addCompanies,
  getAllContacts,
  addContacts,
  addNotes
};
