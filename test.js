// const { getAllContacts } = require('./modules/amocrm');
// (async () => {
//   const contacts = await getAllContacts();

//   console.log(contacts);
// })()
// const AmoClient = require('./helpers/amoCrmConnection');

// // Create first and return id
// const leads = [{
//   name : `${leadName} (из бота)`
// }];

// // Create second and return id
// const companies = [{
//   name: vinNumber,
//   linked_leads_id:[ leadId ],
// }];

// // Create third and return id
// const contact = [{
//   name: leadName,
//   linked_leads_id:[ leadId ], // const id = lead[0].id;
//   linked_company_id:[ companyId ],
//   custom_fields: [{
//     id: phoneId,
//     name: phoneName,
//     code: 'PHONE',
//     values: [{ value: phoneNumber, enum: '26615' }]
//   }]
// }];

// // Create note 
// const note = [{ 
//   element_id: leadId,
//   element_type: "2",
//   text: `Детали: ${detail}\nСрочность: ${urgency}`,
//   note_type: "4"
// }];

// const getAllCompanies = async () => {
//   const amoClient = await AmoClient.get();

//   if (amoClient) {
//     const companies = await amoClient.addNotes();

//     // for (const company of companies) {
//       console.log(companies)
//     //   const { contacts, leads } = company;
    
//     // listNotes, setNotes, addNotes, updateNotes

//     //   console.log('\n\nCONTACTS', contacts);
//     //   console.log('\n\nLEADS', leads);
//     // }
//   } else {
//     console.log('No client');
//   }
// };

// // getAllCompanies();

// const addCompany = async (companies) => {
//   const amoClient = await AmoClient.get();

//   if (amoClient) {
//     const company = await amoClient.addCompanies(companies);

//     console.log(company);
//   } else {
//     console.log('No client');
//   }
// };

// const companies = [{
//   name: "DEMO COMPANY",
//   linked_leads_id:[ 2482323 ], // const id = lead[0].id;
// }];

// addCompany(companies);

// amoClient.auth(subdomain, login, key).then(function (res) {
//   console.log('auth res: ', res);

//   if (res.auth === true) {
//     amoClient.listContacts({}).then(ds => {
//       const peter = ds.find(val => val.id === 827179)
//       //  if (Array.isArray(ds.custom_fields)) {
//         for (const pe of peter.custom_fields) {
//           console.log("\n",pe, pe.values)
//           // console.log('\n',peter.custom_fields[0].values)
//         }
//       //  }
//     })
//     amoClient.addLeads([{
//       name: "Грасии (из Бота)",
//       tags: "today",
//       custom_fields: [
//         {
//           id: urgencyId,
//           name: urgencyName,
//           values: [{ value: "Завтра"}]
//         },
//         { id: vinId,
//           name: vinName,
//           values: [{ value: "JA111TJ8055510777"}]
//         }
//       ]
//     }]).then(lead => {
//       console.log("\n\nADDED NEW LEAD", lead)
//       const id = lead[0].id;
//       console.log('Lead id', id)

//       if (id) {
//         amoClient.addContacts(
  //[{
//           name: "Грасии",
//           linked_leads_id:[ id ],
//           custom_fields: [
//             {
//               id: phoneId,
//               name: phoneName,
//               code: 'PHONE',
//               values: [{ value: "+380933485968", enum: '26615' }]
//             }
//           ]
//         }]).then(contact => {
//           console.log('ADDED NEW CONTACT: ', contact)
//           const id = contact[0].id;
//         })
//       }
//     })
//   }
// });



// Add Leads
// amoClient.addLeads([
//   {
//    name : "Mark Fildrovich" ,
//    tags: "justtoday, nottomorrow",
//    price: 10000,
//    custom_fields: [
//      {
//        id: 16835,
//        name: 'Срочность',
//        values: [{ value: "now now now"}]
//      },
//      { id: 16837,
//        name: 'Номер авто',
//        values: [{ value: "tomorow"}]
//      }
//    ]
//  }
// ]).then((id) => {
// console.log("\n\nID: ", id);
// })

// List lead
// amoClient.listLeads({}).then(ds => {
//   const mark = ds.find(val => val.id === 2481773)
//   console.log(mark.main_contact)
//   console.log(mark.contacts)
//   console.log(mark)
//   for (const d of ds) {
//     console.log('\n', d.custom_fields)
//     console.log('\n', d.custom_fields[0])
//     if (d.custom_fields[0]) {
//       for (const val of d.custom_fields[0]) {
//         console.log('\n', val)
//       }
//     }
//   }
// })

